public with sharing class DragAndDropComponentHandler {
    @AuraEnabled
    public static List<Task_List__c> getAllTask(){
        return [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c];
    }
    @AuraEnabled
    public static CaseWrapper getTasks() {
        List<Task_List__c> newtask = new List<Task_List__c>();
        List<Task_List__c> workingTasks = new List<Task_List__c>();
        List<Task_List__c> closedTasks = new List<Task_List__c>();
        List<Task_List__c> tasklist = [SELECT Id, Name, Status__c FROM Task_List__c];
        if(tasklist != null && tasklist.size() > 0) {
            for (Task_List__c tsk: tasklist) {
                if(tsk.Status__c == 'Planned'){
                    newtask.add(tsk);
                }else if(tsk.Status__c == 'In Progress') {
                    workingTasks.add(tsk);
                }else if(tsk.Status__c == 'Paused') {
                    closedTasks.add(tsk);
                }
            }
            CaseWrapper cw = new CaseWrapper();
            cw.workingTasks = workingTasks;
            cw.closedTasks = closedTasks;
            cw.newtask = newtask;
            cw.taskCount = tasklist.size();
            return cw;
        }
        return null;
    }
    public class CaseWrapper{
        @AuraEnabled
        public List<Task_List__c> workingTasks;
        @AuraEnabled
        public List<Task_List__c> closedTasks;
        @AuraEnabled
        public List<Task_List__c> newtask;
        @AuraEnabled
        public Integer taskCount;
    }
    @AuraEnabled
    public static CaseWrapper updateTask(Id newTaskId, String newStatus){
        Task_List__c updateTask = new Task_List__c(Id = newTaskId, Status__c = newStatus);
        update updateTask;
        return getTasks();
    }
}