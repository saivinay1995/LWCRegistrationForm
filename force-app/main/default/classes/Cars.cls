public with sharing class Cars {

    @AuraEnabled
    public static String createContact(Contact con) {
       
        insert con;
        return 'Contact Inserted Successfully';
    }

    @AuraEnabled
    public static String editContact(Id i,Contact con) {
       Contact c=[select id,firstname,lastname,email,phone from contact where id=:i];
        c=con;
        update c;
        return 'Contact updated Successfully';
    }

    @AuraEnabled
    public static List<Contact> getAllContacts(){
        return [select id,firstname,lastname,email,phone from contact];
    }

    @AuraEnabled
    public static string delContacts(Id ids){
        Contact c=[select id from contact where id=:ids];
        delete c;
        return 'contact deleted Successfully';
    }

    @AuraEnabled
    public static Contact getContact(Id c){
        Contact cc=[select id,firstName,LastName,Email,Phone from contact where id=:c];
        return cc;
    }
}
