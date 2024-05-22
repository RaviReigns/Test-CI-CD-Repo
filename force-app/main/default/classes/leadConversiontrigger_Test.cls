@isTest
public class leadConversiontrigger_Test {
@isTest
    static void TestUpdatedConvertedLead() {
        Lead testLead = [Select Id, Status, IsConverted
                         From Lead
                         Where LastName='Boxer'];

Test.startTest();
        Database.LeadConvert lc = new Database.LeadConvert();
        lc.setLeadId(testLead.Id);
        lc.setConvertedStatus('Converted');
        Database.LeadConvertResult lcr = Database.convertLead(lc);
		Test.stopTest();
        
      testLead = [Select Id, Status, IsConverted
                         From Lead
                         Where LastName='Smith1'];

System.assert(True,testLead.IsConverted);
        System.assert(lcr.isSuccess());
        System.assertEquals('Converted',testLead.Status);
    }
}