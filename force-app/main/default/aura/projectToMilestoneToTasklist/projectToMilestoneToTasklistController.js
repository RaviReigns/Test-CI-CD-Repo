({
    doinit : function(component, event, helper) {
        var action = component.get("c.getgoods");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert('getp' + JSON.stringify(response.getReturnValue()));
            if(state === 'SUCCESS') {
                var rval = response.getReturnValue();
                //console.log(rval.length); selectedProjects cproject selectedProjects
                component.set("v.productlist", rval);
                component.set("v.cproject", rval);
            }
        })
        $A.enqueueAction(action);
    },
    
    gonext : function(component, event, helper) {
        var allproduct = component.get("v.productlist");
        var cproject = component.get("v.cproject");
        
        for(let item of cproject) {
            if(item.isChecked == true) {                
                for(let product of allproduct) {
                    
                    if(product.Id == item.Id) {
                        product.isChecked = true;
                        break;
                    }
                }
            }
        }
        
        var cp = [];
        for(let product of allproduct) {
            if(product.isChecked == true) {
                product.quantity = 1;
                cp.push(product);
            }
        }
        
        component.set("v.selectedProjects", cp);
        //alert(JSON.stringify(component.get("v.selectedProjects")));
        component.set("v.next", true);
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
        //alert('in save ');
        var MilestoneName = component.find("MilestoneName").get("v.value");
        var MilestoneDes = component.find("MilestoneDes").get("v.value");
        //alert(JSON.stringify(component.get("v.tasklist")));
        //alert(JSON.stringify(component.get('v.selectedProjects')));
        //alert(MilestoneName);
        //alert(MilestoneDes);
        var action = component.get("c.onsave");
        action.setParams({
            'tasklist' : component.get("v.tasklist"),
            'projectlist' : component.get('v.selectedProjects'),//projectlist
            'milestoneName' : MilestoneName,
            'milestoneDes' : MilestoneDes
        });
        //console.log('save method');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            //alert(JSON.stringify(response.getReturnValue()));
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The records has been created successfully."
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                //alert(JSON.stringify(response.getReturnValue()));
            }
            
            if(state === 'ERROR') {
                title = "ERROR";
                type = 'error';
                let err = response.getError();
                message = err[0].message;
            }
            
        });
        
        $A.enqueueAction(action);
    },
    
    cancelit : function(component, event, helper) 
    { 
        $A.get('e.force:refreshView').fire();
    },
    searchproduct : function(component, event, helper) {
        var allproduct = component.get("v.productlist");
        //  var filter1 = component.get("v.filter1").toLowerCase().trim();
        var filter2 = component.get("v.filter2").toLowerCase().trim();
        var sortedproduct = [];
        
        if(filter2!='')
        {
            for(let item of allproduct) {
                // if(item.isChecked != true) {
                let name = item.Name;
                let hsn = item.Status__c;
                let size = item.Account__r.Name;
                //let act = item.pdt.IsActive;
                
                if(name == undefined || name.length == 0) name = '';
                else name = name.toLowerCase().trim();
                
                if(hsn == undefined || hsn.length == 0)hsn = "";
                else hsn = hsn.toLowerCase().trim();
                
                if(size == undefined || size.length == 0)size = "";
                else size = size.toLowerCase().trim();
                
                
                // if(act == undefined || act.length== 0)act ="";
                //  else act =act.toLowerCase().trim();
                
                if(name.includes(filter2) || hsn.includes(filter2) ||  size.includes(filter2)) 
                {   
                    sortedproduct.push(item);
                }                
            }
            
            component.set("v.cproject", sortedproduct);
        }
        else
        {  
            helper.getproduct(component, event, helper);
            
            
        }
    },
    addmore : function(component, event, helper) {
        var allproduct = component.get("v.productlist");
        var cproject = component.get("v.cproject");
        
        for(let item of cproject) {
            if(item.isChecked == true) {                
                for(let product of allproduct) {
                    
                    if(product.Id == item.Id) {
                        product.isChecked = true;
                        break;
                    }
                }
            }
        }
        
        var cp = [];
        for(let product of allproduct) {
            if(product.isChecked != true) {
                cp.push(product);
            }
        }
        //alert("all product length: "+allproduct.length);
        // alert("current product length: "+cp.length);
        
        component.set("v.productlist", allproduct);
        component.set("v.cproject", cp);
        component.set("v.filter1", "");
        component.set("v.filter2", "");
    }
})