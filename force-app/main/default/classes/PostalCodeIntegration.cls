public class PostalCodeIntegration {
    
    @AuraEnabled
    public Static list<Object> searchBranchDetails(String pinCodeNumber){
        
        list<PostOfficeBranch> lstPostalBranches = new list<PostOfficeBranch>();
        
        if(pinCodeNumber != null && pinCodeNumber !=''){
            //invoke the webservice and get the response
            string endPointURL ='https://api.postalpincode.in/pincode/'+pinCodeNumber;
            
            httpRequest pRequest = new httpRequest();
            pRequest.setEndpoint(endPointURl);
            pRequest.setMethod('GET');
            pRequest.setTimeout(12000);
            
            Http hnew = new Http();
            HTTPResponse response = hnew.send(pRequest);
            
            system.JSONParser pParser = system.Json.createParser(response.getBody());
            while(pParser.nextToken()!= null){
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText()=='Message'){
                    pParser.nextToken();
                    system.debug('Number of Branches Found : '+pParser.getText());            
                }
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText()=='Status'){
                    pParser.nextToken();
                    system.debug('Status : '+pParser.getText());            
                }
                if(pParser.getCurrentToken() == JsonToken.FIELD_NAME && pParser.getText()=='PostOffice'){
                    pParser.nextToken();
                    if(pParser.getCurrentToken()==JsonToken.START_ARRAY){
                        pParser.nextToken();
                        while(pParser.getCurrentToken()== JsonToken.START_OBJECT){
                            PostOfficeBranch branchInfo = (PostOfficeBranch)pParser.readValueAs(PostOfficeBranch.class);
                            lstPostalBranches.add(branchInfo);
                        }
                    }          
                }
            }
        }
        return lstPostalBranches;
    }
    public class PostOfficeBranch {
        
        @AuraEnabled public string Name;
        @AuraEnabled public string Description;
        @AuraEnabled public string BranchType;
        @AuraEnabled public string DeliveryStatus;
        @AuraEnabled public string Circle;
        @AuraEnabled public string District;
        @AuraEnabled public string Division;
        @AuraEnabled public string Region;
        @AuraEnabled public string Block;
        @AuraEnabled public string State;
        @AuraEnabled public string Country;
        @AuraEnabled public string Pincode;
    }
    
}