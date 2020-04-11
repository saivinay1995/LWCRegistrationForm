import { LightningElement, track} from 'lwc';
import saveContact from '@salesforce/apex/Cars.createContact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import PHONE from '@salesforce/schema/Contact.Phone';
import EMAIL from '@salesforce/schema/Contact.Email';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getContacts from '@salesforce/apex/Cars.getAllContacts';
import delcon from '@salesforce/apex/Cars.delContacts';
import getSingleContact from '@salesforce/apex/Cars.getContact';
import updateCon from '@salesforce/apex/Cars.editContact';


export default class CreateRecordWithFieldIntigrity extends LightningElement {
   
    @track visible=false;
    @track editboolean=false;
    @track editid;
    @track delrec;
    @track error;
    @track allcontacts;
    @track conrec={
        FirstName:FIRST_NAME,
        LastName:LAST_NAME,
        Phone:PHONE,
        Email:EMAIL
    };
    connectedCallback()
    {
        getContacts()
        .then(result=>{
            this.allcontacts=result;
            window.console.log(result);
        })
        .catch(error=>{
            window.console.log(error);
        })
    }
    fname(event)
    {
        this.conrec.FirstName=event.target.value;
    }

    lname(event)
    {
        this.conrec.LastName=event.target.value;
    }

    email(event)
    {
        this.conrec.Email=event.target.value;
    }

    phone(event)
    {
        this.conrec.Phone=event.target.value;
    }

    deleteRecord(event)
    {
        this.delrec=event.target.value;
        this.visible=!this.visible;

    }

    del(event)
    {
        
        delcon({ids:this.delrec})
        .then(result=>{
            const events = new ShowToastEvent({
                title: 'Contact',
                message: result,
                variant:'error',
            });
            this.dispatchEvent(events);
            console.log(result);
        })
        .catch(error=>{
            console.log('error');
        });

        this.visible!=this.visible;
        setTimeout(function(){window.location.reload()},2000);
    }
    
    saveRecord()
    {
        if(this.editboolean==false){
        console.log(this.conrec.FirstName);
        console.log(this.conrec.LastName);
        console.log(this.conrec.Email);
        console.log(this.conrec.Phone);
        
        saveContact({con : this.conrec})
        .then(result => {
            // Clear the user enter values
            console.log(this.conrec)
            this.conrec = {};
            const event = new ShowToastEvent({
                title: 'Contact',
                message: result,
                variant:'success',
            });
            this.dispatchEvent(event);
            window.console.log('result ===> '+result);
            // Show success messsage

          
        })
        .catch(error => {
            this.error = error.message;
            console.log('error==>'+error);
        });

       
    }
    else
    {
        updateCon({i:this.editid,con:this.conrec})
        .then(result=>{
            console.log(result);
            const toasteve=new ShowToastEvent({
                title:'Contact',
                message:'Contact Updated Successfully',
                variant:'success'
            });
            this.dispatchEvent(toasteve);
        })
        .catch(error=>{
            console.log(error);
        });
    }
    setTimeout(function(){window.location.reload()},2000);
    }

    edit(event)
    {
        this.editboolean=true;
        this.editid=event.target.value;
        console.log(this.editid);
        getSingleContact({c:this.editid})
        .then(result=>{
            this.conrec=result;
            console.log(result);
        })
        .catch(error=>{
            console.log(error);
        });

        var scrollOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        }
        window.scrollTo(scrollOptions);

    }
}