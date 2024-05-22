({
    doInit : function(component, event, helper) {
        var whichProject =component.get("v.whichProject");
        alert(whichProject);
        var whichObject =component.get("v.whichObject");
         alert(whichObject);
    },
    add : function(component, event, helper){
        helper.addrows(component, event, helper);
    },
    addfiverows : function(component, event, helper) {
        component.set("v.blockgo",true);
        var k=component.get("v.numberofpass");
        var i=0;
        while(i < k) {
            helper.addrows(component, event, helper);
            i += 1;
        }
    },
    
    deleteit : function(component, event, helper) {
        var con = component.get("v.tasklist");
        var index = event.getSource().get("v.value");
        
        con.splice(index, 1);
        component.set('v.tasklist', con);
    },
    saveIt : function(component, event, helper) 
    {
        
        var action = component.get("c.onsave");
        var lltp = component.get("v.tasklist");
        console.log('tasklist----->'+lltp);
        action.setParams({
            'tasklist' : component.get("v.tasklist"),
            'rid' : component.get('v.recordId')
        });
        console.log('save method');
        
        action.setCallback(this, function(response){
            var state = response.getState();
            var title, type, message;
            
            if(state === 'SUCCESS') {
                title = 'SUCCESS';
                type = 'success';
                message = 'Task List created successfully!!!';
                var ttu=response.getReturnValue();
                var homeEvent = $A.get("e.force:navigateToURL");
                homeEvent.setParams({
                    "url": "/"+ttu
                });
                homeEvent.fire();    
                
                $A.get('e.force:refreshView').fire();
            }
            
            if(state === 'ERROR') {
                title = "ERROR";
                type = 'error';
                let err = response.getError();
                message = err[0].message;
            }
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "type": type,
                "message": message
                
            });
            toastEvent.fire();
            
        });
        
        $A.enqueueAction(action);
    },
    
    cancelit : function(component, event, helper) 
    {
        var homeEvent = $A.get("e.force:navigateToURL");
        homeEvent.setParams({
            "url": "/"+component.get('v.recordId')
        });
        homeEvent.fire();    
        
        $A.get('e.force:refreshView').fire();
    },
})