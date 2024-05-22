({
    doInit : function(component, event, helper) {
        helper.addProductRecord(component, event);
        //alert('wrapper');
        var action2 = component.get("c.getPreviousLines");
        action2.setParams({'recId':  component.get('v.recordId')});
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue() !=null && response.getReturnValue()!='' && response.getReturnValue()!=undefined){
                    component.set('v.QuoteItemList',  response.getReturnValue());
                }
                
                //alert(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action2);
        var action = component.get("c.searchProducts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //var productsWrapper = response.getReturnValue();
                component.set('v.Products',  response.getReturnValue());
                //alert(JSON.stringify(response.getReturnValue()));
            }
        });
        $A.enqueueAction(action);
        
         
        
    }, 
    searchText : function(component, event, helper) {
        var products= component.get('v.Products');
        var searchText= component.get('v.searchText');
        //alert(searchText);
        var matchprds=[];
        if(searchText !=''){
            for(var i=0;i<products.length; i++){ 
                if(products[i].productName.toLowerCase().indexOf(searchText.toLowerCase())  != -1  ){
                    matchprds.push( products[i] );
                } 
            } 
            if(matchprds.length >0){
                component.set('v.matchproducts',matchprds);
                //alert(JSON.stringify(matchprds));
            }
            //alert(matchprds.length);
        }else{
            component.set('v.matchproducts',[]);
        }
    },
    
    update: function(component, event, helper) {
        component.set('v.spinner', true);
        var index = event.currentTarget.dataset.record;
        console.log(index);
        var pid =event.currentTarget.dataset.id;
        //alert(pid);
        var pname = event.currentTarget.dataset.name;
        //alert(pname);
        var prds= component.get('v.matchproducts');
        var oitems= component.get('v.QuoteItemList');
        var recId = component.get('v.recordId');
        //alert(JSON.stringify( component.get('v.matchproducts')) + '-----' + pid);
        //alert(JSON.stringify(prds));
        for(var i=0;i<prds.length; i++){ 
            if(prds[i].Product2Id === pid ){
                //alert( oitems[index].Product2Id + '   inndexed');
                oitems[index].Product2Id = prds[i].Product2Id;
                oitems[index].UnitPrice = prds[i].unitPrice;
                console.log(prds[i].productName);
                oitems[index].Name = prds[i].productName;
                oitems[index].PricebookEntryId = prds[i].pricebookEntryId;
                oitems[index].OpportunityId = recId;
                component.set('v.searchText', '');
                //alert(1);
                break;
            }
            
        } 
        //alert(JSON.stringify(oitems));
        component.set('v.QuoteItemList',oitems);
        //component.set('v.searchText',pname);
        component.set('v.matchproducts',[]);
        component.set('v.spinner', false);
        
    },
    
    addRow: function(component, event, helper) {
        helper.addProductRecord(component, event);
        
    },     
    removeRow: function(component, event, helper) {
        var quoteList = component.get("v.QuoteItemList");
        var selectedItem = event.currentTarget;
        var index = selectedItem.dataset.record;
        var oitems= component.get('v.QuoteItemList');
        
        oitems.splice(index, 1);
        component.set("v.QuoteItemList", oitems);
        
        if(oitems.length < 1){
            helper.addProductRecord(component, event);
        }
    },
    quoteSave : function(component, event, helper) {
        
        //helper.saveQuote(component,event,helper);
         var action2 = component.get("c.saveLineItem2");
        action2.setParams({'itemList':  component.get('v.QuoteItemList'),
                           'recId':component.get('v.recordId')});
        action2.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
               component.set("v.Products", []);
                component.set("v.matchproducts", []);
                component.set("v.QuoteItemList", []);
                //component.set('v.GrandTotal',0.00);
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": component.get('v.recordId'),
                    "slideDevName": "detail"
                });
                navEvt.fire();
                
                helper.showToast("Products added successfully","success");
                //alert(JSON.stringify(response.getReturnValue()));
            }else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action2);
    },
    getGrandTotal : function(component, event, helper) {
      var index = event.currentTarget.dataset.record;
        var oitems= component.get('v.QuoteItemList');
        console.log('up: '+oitems[index].UnitPrice);
        console.log('Qty: '+oitems[index].Quantity);
        oitems[index].TotalPrice  = oitems[index].UnitPrice * oitems[index].Quantity;
        //alert(oitems[index].Total_Amount__c);
        component.set('v.QuoteItemList',oitems);
    
},
    updateDate : function(component, event, helper) {
          var index = event.currentTarget.dataset.record;
        var oitems= component.get('v.QuoteItemList');
        console.log('up: '+oitems[index].UnitPrice);
        console.log('Qty: '+oitems[index].Quantity);
        oitems[index].TotalPrice  = oitems[index].UnitPrice * oitems[index].Quantity;
         var  mydate = new Date(oitems[index].ServiceDate );
    oitems[index] = mydate ;
        component.set('v.QuoteItemList',oitems);
    }
    
})