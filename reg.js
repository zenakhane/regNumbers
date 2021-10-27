const { request } = require("express");

module.exports = function Registra(pool) {

        var regDisplay = [];
        var regDisplayFilter = [];
        var registrationDisplay = 0;
    
    
        function displayRegistrations(townTag) {
            regDisplayFilter = [];
            for (var i = 0; i < regDisplay.length; i++) {
                let town = regDisplay[i];
                if (town.startsWith(townTag)) {
                    regDisplayFilter.push(town)
                }
            }
            return regDisplayFilter
        }
    
        function setRegNumbers(register) {
            // register = register.toUpperCase();
            if (!regDisplay.includes(register)) {
                // registrationDisplay++;
                regDisplay.push(register);
                return regDisplay
            }
        }
    
        function getRegDisplay() {
            return regDisplay
        }
    
        function setRegDisplay(register) {
            // register = register.charAt(0).toUpperCase() + register.slice(2);
            regDisplay = register;
        }
    
        function getRegistrationDisplay() {
            return registrationDisplay
        }
    
        function regErrors(registration) {
    
            if (registration == '') {
                return "Please enter a registration!"
            } else {
                return ''
            }
        }

        // async function removeName(){
        //     await pool.query('delete  from greet')
        //       }
            
        return {
          
            displayRegistrations,
            setRegDisplay,
            getRegDisplay,
            setRegNumbers,
            getRegistrationDisplay,
            regErrors
            // removeName
        }
    }
	
