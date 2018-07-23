class DH_Base {

    constructor(callback_func){
        this.scope = {};
        this.old_scope = {};
        this.callback = callback_func; // needs type checking for function
    }

    get_all_scope_elements(){
        return this.scope;
    }

    add_scope_elems(elem){
        this.old_scope = JSON.parse(JSON.stringify(this.scope));
        this.scope[elem.name] = elem.value;
    }

    set_scope_elem(elem){
        try{
            if(this.scope[elem.name]){
                this.old_scope = JSON.parse(JSON.stringify(this.scope));
                this.scope[elem.name] = elem.value;
            } else {
                this.add_scope_elems(elem)
            }

            this.fire_events()
        }
        catch(err){
            console.log("Unknown element provided");
            console.log(err);
        }
    }

    check_scope_equality(){
        if(JSON.stringify(this.old_scope) === JSON.stringify(this.scope) ){
            // same do nothing
            // console.log('Do nothing ' + JSON.stringify(this.scope) + JSON.stringify(this.old_scope));
            return true;
        } else {
            return false;

        }
    }

    fire_events(){
        if(!this.check_scope_equality()){
            this.callback(this.get_all_scope_elements());
        }
    }

}


class DH_watcher extends DH_Base{

    constructor(callback_func){
        super(callback_func);
        this.set_watcher();
    }

    set_watcher(){
        var _this = this;
        var elements = document.querySelectorAll('[dh-bind]');

        elements.forEach(function(element){
            element.onkeyup = function(){

                var elem = {
                    'name'  : element.getAttribute('dh-bind'),
                    'value' : element.value
                };

                _this.set_scope_elem(elem);
            }
        });
    }

}


class DH_Bind extends DH_watcher{
    constructor(callback_func){

         if(!callback_func){
            callback_func = function(){}
         }
         super(callback_func);

    }

    ajax_call(scope_elem_name, url = "", method = 'GET'){
        var elem = {
             'name' : scope_elem_name,
             'value': Math.random() // This is for testing - should be left blank
        }

/*
        '''
            TODO - make ajax call --- Needs to be improved
                 - Use helper methods
        '''
*/

/*
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                elem.value = xmlHttp.responseText
                  this.successfunc(elem);
        }
        xmlHttp.open(method, url, true); // true for asynchronous
        xmlHttp.send(null);
*/

        this.successfunc(elem);

    }

    successfunc(elem){
        this.set_scope_elem(elem)
    }

    errorfunc(){
        // Error Handling
    }

    get_scope_elements(){
        return this.get_all_scope_elements();
    }
}
