public class editallmilestone
 {
   @AuraEnabled
    public static list<Milestone__c> getlineitem(string recId){
        list<Milestone__c> trplist= new list<Milestone__c>();
        trplist=[SELECT Id,  Name, CreatedById, LastModifiedById, Project__c, Deadline__c, Description__c,   Actual_Start_Date__c,
                 Contact__c, Actual_End_Date__c, Stage__c,  Milestone_Order__c FROM Milestone__c where Project__c=:recId];
        
        return trplist;
    }
    
    @AuraEnabled
    public static string onsave( string recId, list<Milestone__c> salelist1 ){
        string result;
     
  list<Milestone__c> trplist= new list<Milestone__c>();
        trplist=[SELECT Id,  Name, CreatedById, LastModifiedById, Project__c, Deadline__c, Description__c,   Actual_Start_Date__c,
                 Contact__c, Actual_End_Date__c, Stage__c,  Milestone_Order__c FROM Milestone__c where Project__c=:recId];

        
            
            Map<Id, Milestone__c> limap = new Map<Id, Milestone__c> ();
            for(Milestone__c item : salelist1) {
                limap.put(item.Id, item);
            }
            
            for(Milestone__c item : trplist) {
                if(limap.containsKey(item.Id)) {
                    Milestone__c temp = limap.get(item.Id);
                    update temp;
                }
                else delete item;
            }
            
            result='Success';
     
        
        return result;
    }
    


}