public class HIC_AddOppLineItemsController { 
     @AuraEnabled
    public static void testlines(List<OpportunityLineItem> itemList,string recId){
       system.debug('nnlednjedv');
      
    }
     @AuraEnabled
    public static void saveLineItem2(List<OpportunityLineItem> itemList,string recId){
        system.debug(itemList.size());
        opportunity opp = new opportunity();
        opp.Id = recId;
        opp.Pricebook2Id = [SELECT Id FROM pricebook2 WHERE Isstandard=true LIMIT 1].Id;
        update OPP;
        upsert itemList;
    }
    
     @AuraEnabled
    public static List<OpportunityLineItem> getPreviousLines(string recId){
        return [SELECT Id,Name,Product2Id,Quantity,UnitPrice,ServiceDate,PricebookEntryId,OpportunityId,TotalPrice FROM OpportunityLineItem WHERE OpportunityId=:recId];
    }
    
    @AuraEnabled
    public static void addOpportunityLineItems(List<Id> productIds, List<Decimal> quantities, List<Decimal> prices, List<Date> dates, Id opportunityId) {
        List<OpportunityLineItem> opportunityProducts = new List<OpportunityLineItem>();
        for (Integer i = 0; i < productIds.size(); i++) {
            PricebookEntry pbe = [SELECT Id, Product2Id, Pricebook2Id FROM PricebookEntry WHERE Product2Id =: productIds[i] AND Pricebook2Id =: [SELECT Id FROM Pricebook2 WHERE IsStandard = true LIMIT 1].Id LIMIT 1];
            OpportunityLineItem opportunityProduct = new OpportunityLineItem();
            opportunityProduct.OpportunityId =  opportunityId;
            opportunityProduct.Product2Id = productIds[i];
            opportunityProduct.PricebookEntryId = pbe.Id;
            opportunityProduct.UnitPrice = prices[i];
            opportunityProduct.ServiceDate = dates[i];
            opportunityProduct.Quantity = quantities[i];
            opportunityProducts.add(opportunityProduct);
        }
        insert opportunityProducts;
    }
    @AuraEnabled
    public static List<ProductWrapper> getListPrice() {
        Pricebook2 standardPricebook = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        List<ProductWrapper> products = new List<ProductWrapper>();
        for (PricebookEntry pbe : [SELECT  Id,Product2Id , Product2.Name, UnitPrice FROM PricebookEntry WHERE Pricebook2Id = :standardPricebook.Id]) {
            products.add(new ProductWrapper(pbe));
        }
        return products;
    }
    
    public class ProductWrapper {
        @AuraEnabled public String productName { get; set; }
        @AuraEnabled public Decimal unitPrice { get; set; }
        @AuraEnabled public String Product2Id { get; set; }
         @AuraEnabled public String pricebookEntryId { get; set; }
        
        public ProductWrapper(PricebookEntry pbe) {
            this.productName = pbe.Product2.Name;
            this.unitPrice = pbe.UnitPrice;
            this.Product2Id = pbe.Product2Id;
            this.pricebookEntryId = pbe.Id;
        }
    }
    
    
    @AuraEnabled
    public static List<ProductWrapper> searchProducts(String searchKey) {
        List<ProductWrapper> productsWrapper = new List<ProductWrapper>();
        if(searchKey==null || searchKey==''){
            for (PricebookEntry pbe : [SELECT Id,Product2.Name, Product2.ProductCode, UnitPrice FROM PricebookEntry WHERE Pricebook2.IsStandard = true]) {
                productsWrapper.add(new ProductWrapper(pbe));
            }
        }
        else{
            for (PricebookEntry pbe : [SELECT  Id,Product2.Name, Product2.ProductCode, UnitPrice FROM PricebookEntry WHERE Pricebook2.IsStandard = true AND Product2.Name LIKE : searchKey+'%']) {
                productsWrapper.add(new ProductWrapper(pbe));
            }
        }
        return productsWrapper;
    }
}