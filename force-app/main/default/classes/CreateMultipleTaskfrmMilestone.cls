public class CreateMultipleTaskfrmMilestone {
    
    @AuraEnabled
    public static string onsave(list<Task_List__c> tasklist,string rid) {
        system.debug('TasksList-------->'+tasklist);
        Milestone__c m = [select id , Name, Project__c from Milestone__c where id=: rid];
        
        for(Task_List__c ts : tasklist){
            ts.Project__c = m.Project__c;
            ts.Milestone__c = m.Id;
            ts.Status__c ='Planned';
           
        }
        
        insert tasklist;
        return rid;
    }
    
    
}