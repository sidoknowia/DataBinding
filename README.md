# DataBinding
2-way data binding and scope in vanilla javascript


This library replicates scopes as seen in angular 1.0. It also provides two-way data binding for input elements.

- How to use - 

Build an object of class DH_Bind

var d = DH_Bind(function(scope_data){
  console.log(scope_data);
})

This class takes an optional call back function. This function would be called everytime scope value changes.


Alternatively, you can also get the current scope data by calling get_scope_elements method

var current_scope = d.get_scope_elements()



Moreover, any input element with attribute dh-bind, will be added to list of scope elements. 
