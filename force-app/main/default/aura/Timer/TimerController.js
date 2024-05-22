({
    doInit : function(component, event, helper) {
        console.log("diinit get called!!");
        //var tt=component.get("v.ltngHour")+":"+component.get("v.ltngMinute")+":"+component.get("v.ltngSecond");
        component.set("v.ltngTimmer","00:00:00");
    },
    handleStartClick : function(component, event, helper) {
        console.log("start button clicked!!");
        
        var hours=component.get("v.ltngHour");
        var minutes=component.get("v.ltngMinute");
        var seconds=component.get("v.ltngSecond");
        var tt=component.get("v.ltngHour")+":"+component.get("v.ltngMinute")+":"+component.get("v.ltngSecond");
        
        if(tt=="0:0:0" || tt=="00:00:00"){
            alert("Please enter some value for timer!!");
            
        }
        else{
            component.set("v.ltngTimmer",hours+":"+minutes+":"+seconds);
            helper.setStartTimeOnUI(component);
        }
    },
    handleStopClick : function(component, event, helper) {
        console.log("stop button clicked!!");
        var currtt=component.get("v.ltngTimmer");
        var ss = currtt.split(":");
        component.set("v.ltngHour",ss[0]);
        component.set("v.ltngMinute",ss[1]);
        component.set("v.ltngSecond",ss[2]);
        helper.setStopTimeOnUI(component);
    },
    handleResetClick : function(component, event, helper) {
        console.log("Reset button clicked!!");
        helper.setResetTimeOnUI(component);
    } 
})