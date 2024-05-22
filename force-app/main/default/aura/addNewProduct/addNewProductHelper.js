({
    addProductRecord: function(component, event) {
         var productList = component.get("v.QuoteItemList");
        productList.push({
            'sobjectType': 'OpportunityLineItem',
            'Product2Id': ' ',
            'Quantity': ' ',
            'UnitPrice': ' ',
            'ServiceDate':' ',
            'PricebookEntryId':' ',
            'OpportunityId':' ',
            'Name':''
            
        });
        component.set("v.QuoteItemList", productList);
        //(JSON.stringify( component.get('v.QuoteItemList')));
    },
    
    validateQuoteList: function(component, event) {
        var isValid = true;
        var orderList = component.get("v.QuoteItemList");
        for (var i = 0; i < orderList.length; i++) {
            
            if (orderList[i].Product__c == '') {
                isValid = false;
                //alert('Product Name cannot be blank on row number ' + (i + 1));
            }else if(orderList[i].Quantity__c == '' || orderList[i].Quantity__c == null){
                isValid = false;
                //
                //alert('please enter quantity on row number ' + (i + 1));
            }
        }
        return isValid;
    }, 
    saveQuote : function(component,event,helper) {  
        var action=component.get("c.testlines");
        action.setParams({'itemList':  component.get('v.QuoteItemList'),
                          'recId': component.get('v.recordId')
                         });
        action.setCallback(this,function(response){ 
            
            if(response.getState() == "SUCCESS"){ 
                //var qId = response.getReturnValue();
               // component.set("v.quoteId",qId);
                //component.set('v.showQuote',false);
                //component.set('v.showPdf',true);
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
                
                helper.showToast("Quote created successfully","success");
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
        $A.enqueueAction(action); 
        
    }, 
    showToast : function(message,type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type":type,
            "message":  message
        });
        toastEvent.fire();
    },
})