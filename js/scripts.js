// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId();
//   this.contacts.push(contact);
// }

// AddressBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// }

AddressBook.prototype.addContact = function(contact) {
  this.currentId += 1;
  contact.id = this.currentId;
  this.contacts.push(contact);
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.addresses = []
  this.currentId = 0;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.addAddress = function(address) {
  this.currentId += 1;
  address.id = this.currentId;
  this.addresses.push(address);
}

Contact.prototype.findAddress = function(id) {
  for (var i=0; i< this.addresses.length; i++) {
    if (this.addresses[i]) {
      if (this.addresses[i].id == id) {
        return this.addresses[i];
      }
    }
  };
  return false;
}

function Address(address, type) {
  this.address = address;
  this.type = type;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
 var contactsList = $("ul#contacts");
 var htmlForContactInfo = "";
 addressBookToDisplay.contacts.forEach(function(contact) {
  //  htmlForContactInfo += "<li id=" contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
   htmlForContactInfo += `<li id=${contact.id}>${contact.firstName} ${contact.lastName}</li>`;
 });
 contactsList.html(htmlForContactInfo);
};

function attachDeleteFunction(){
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

function showContact(contactId){
  var contact = addressBook.findContact(contactId);
  var address = contact.findAddress(1);
  var address2 = contact.findAddress(2);
    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".address").html("(" + address.type + ") " + address.address);
    if (address2){
      $(".address").append("<br>(" + address2.type + ") " + address2.address);
    }
    var buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete Contact</button>")
    attachDeleteFunction();
}

function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id); //update this.addressId to account for multiple addresses
    });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedAddressType = $("#address-type-selector").val();
    var inputtedAddress2 = $("input#new-address-2").val();
    var inputtedAddressType2 = $("#address-type-selector-2").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#address-type-selector").val("");
    $("input#new-address-2").val("");
    $("input#address-type-selector-2").val("");
    var newAddress = new Address(inputtedAddress, inputtedAddressType);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    newContact.addAddress(newAddress);
    if (inputtedAddress2) {
      var newAddress2 = new Address(inputtedAddress2, inputtedAddressType2);
      newContact.addAddress(newAddress2);
    }
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    displayContactDetails(addressBook);
  })
})