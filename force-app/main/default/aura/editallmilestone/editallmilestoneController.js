({
   doInit : function(component, event, helper) 
    { 
        
        var action = component.get("c.getlineitem");
        
        action.setParams({
            
            "recId":component.get("v.recordId")
            
        });
        
        action.setCallback(this, function(response){
            var status=response.getState();
            if(status==='SUCCESS')
            {
              //alert(JSON.stringify(response.getReturnValue()));
                component.set("v.piliList",response.getReturnValue());                       
            }
        });
        
        $A.enqueueAction(action);
    },
    
    onSave : function(component, event, helper) {
        alert(component.get("v.recordId"));
        var action = component.get("c.onsave");
        
        action.setParams({
            "recId" : component.get("v.recordId") ,
            "salelist1" : component.get("v.piliList")                
        });
        
        action.setCallback(this,function(response){
            var type;
            var msg;
            var title;
            var status=response.getState();
            //alert(JSON.stringify(response.getReturnValue()));
            if(status==="SUCCESS")
            {
                type="success";
                msg="Milestone updated sucessfully!!!";
                title="SUCCESS!!!";
                
                var urlEvent=$A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url":"/"+ component.get("v.recordId")
                });
                urlEvent.fire(); 
                
            }
            if(status === 'ERROR') {
                type="error";
                title="ERROR!!!";
                msg="Something went wrong!!!";
            }
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "type": type,
                "message": msg                
            });  
            
            toastEvent.fire();
            
        });
        
        $A.enqueueAction(action);   
        
        
    }, 
    
    
    removeDeletedRow : function(component, event, helper) {
        var index = event.getSource().get("v.value");            
        var li = component.get("v.piliList");
        
        li.splice(index, 1);
        component.set("v.piliList", li);
    },
    
   
    cancelit : function(component, event, helper) {
        var urlEvent=$A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url":"/"+ component.get("v.recordId")
        });
        urlEvent.fire(); 
        
    }
})