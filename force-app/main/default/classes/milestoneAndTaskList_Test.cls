@isTest
public class milestoneAndTaskList_Test {
    @isTest
    public static  void myTest(){
        
        List<Master_Milestone__c> masterMilestones = new List<Master_Milestone__c>();
        
        //Create dummy master milestone
        Master_Milestone__c mastmile1 = new Master_Milestone__c();
        mastmile1.Name = 'test2023-11';
        mastmile1.Description__c = 'this is test 2023 mastermile record-1'; 
        masterMilestones.add(mastmile1);
        
        Master_Milestone__c mastmile2 = new Master_Milestone__c();
        mastmile2.Name = 'test2023-12';
        mastmile2.Description__c = 'this is test 2023 mastermile record-2'; 
        masterMilestones.add(mastmile2);
        
        insert masterMilestones;
        
        List<Master_Tasklist__c> customTasks = new List<Master_Tasklist__c>();
        
        Master_Tasklist__c mastask1 = new Master_Tasklist__c();
        mastask1.Name = 'testtask2023-task1';
        mastask1.Description1__c = 'this is test 2023 testtask recordtask1';
        mastask1.Master_Milestone__c = mastmile1.Id;
        customTasks.add(mastask1);
        
        Master_Tasklist__c mastask2 = new Master_Tasklist__c();
        mastask2.Name = 'testtask2023-task2';
        mastask2.Description1__c = 'this is test 2023 testtask recordtask2';
        mastask2.Master_Milestone__c = mastmile2.Id;
        customTasks.add(mastask2);
        
        Master_Tasklist__c mastask3 = new Master_Tasklist__c();
        mastask3.Name = 'testtask2023-task3';
        mastask3.Description1__c = 'this is test 2023 testtask recordtask3';
        mastask3.Master_Milestone__c = mastmile2.Id;
        customTasks.add(mastask3);
        
        insert customTasks;
        
        //dummy project
        Project1__c project = new Project1__c();
        project.Name = 'test 11';
        project.Status__c = 'Active - Ongoing';
        project.Key_Contacts_Email__c = 'test2023@gmail.com';
        project.Kickoff__c = system.today();
        project.Deadline__c = system.today();
        insert project;
        
        Test.startTest();
        List<Project1__c> prjects = new List<Project1__c>{project};
            update prjects;
        Test.stopTest();
        
        
    }
}