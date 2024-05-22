public with sharing class projectDetailsComponent {
    @AuraEnabled
    public static Task_List__c taskRecordDetailsPage(String taskId) {
        Task_List__c  taskDetails = [SELECT Id, Name, Test_Class_Completed__c,Test_Class_Required__c,Description__c, Milestone__c, Project__c,Est_Mints_Dev__c, Task_Type__c,
                                     Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, MetaData_Type__c,MetaData_Name__c,
                                     Time_Count__c,Committed_End_Date_Time__c,Rev_End_Date_Time__c,Mints_Invested__c,Object_API_Name__c,Start_Date_Time__c,End_Date_Time__c FROM Task_List__c WHERE Id =: taskId LIMIT 1];
        return taskDetails;
    }
    @AuraEnabled
    public static Map<String, String> getRecordNameById(Id recordId) {
        Map<String, String> result = new Map<String, String>();
        String objectName;
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        for (String object211 : schemaMap.keySet()) {
            Schema.SObjectType objectType = schemaMap.get(object211);
            if (objectType.getDescribe().getKeyPrefix() == recordId.getSObjectType().getDescribe().getKeyPrefix()) {
                objectName = object211;
                break;
            }
        }
        if (String.isNotBlank(objectName)) {
            String query = 'SELECT Name FROM ' + objectName + ' WHERE Id = \'' + recordId + '\'';
            List<SObject> records = Database.query(query);
            if (!records.isEmpty()) {
                String recordName = (String) records[0].get('Name');
                result.put('objectName', objectName);
                result.put('recordName', recordName);
            }
        }
        return result;
    }
}