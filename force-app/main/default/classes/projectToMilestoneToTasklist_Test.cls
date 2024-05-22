@isTest
public class projectToMilestoneToTasklist_Test {
    @isTest
    public static void newTest(){
        
        User uu=[select id,name from User where id=:userinfo.getUserId()];
        system.debug('User------------->'+uu);
        Account a = new Account();
        a.name = 'Name';
        a.type='Other';
        a.industry='IT';
        insert a;
        
        Project1__c pro = new Project1__c();
        pro.Name='Testinghg';
        pro.Account__c= a.Id;
        pro.Key_Contacts_Email__c ='Test@email.com';
        pro.Kickoff__c = system.today();
        pro.Deadline__c=system.today();
        pro.Status__c='On Hold';
        insert pro;
        
        Milestone__c milestone = new Milestone__c();
        milestone.Name = 'masterMilestone.Name';
        milestone.Description__c = 'masterMilestone.Description__c';
        milestone.Project__c =  pro.Id;
        milestone.Stage__c = 'Planned';
        insert milestone;
        
        list<Task_List__c> tsklist = new list<Task_List__c>();
        Task_List__c tskl = new Task_List__c();
        tskl.Name='Test';
        tskl.Milestone__c= milestone.Id;
        tskl.Project__c= pro.Id;
        tskl.Task_Type__c= 'Configuration';
        tskl.MetaData_Type__c='Apex Class';
        tskl.Task_Done_in_Sandbox_Or_Production__c='Production';
        tskl.Client_Confirmation_Required__c='No';
        
        tsklist.add(tskl);
        
        list<Project1__c> project = [SELECT Id, Name, Deadline__c, Description__c,
                                     No_of_Milestone__c,Account__r.Name, Status__c FROM Project1__c];
        
        projectToMilestoneToTasklist.getgoods();
        projectToMilestoneToTasklist.onsave(tsklist,project,'milestone','tasklist');
        
    }
}