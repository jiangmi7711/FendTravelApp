import { handleSubmit } from './js/formHandler'
import { updateUI, clearUI, printUI } from './js/UiHandler'
import { setMaxDate, setReturning } from './js/dateHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'
import 'regenerator-runtime/runtime';

console.log("CHANGE!!");
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("button").addEventListener("click", handleSubmit);
    document.getElementById("clearButton").addEventListener("click", clearUI);
    document.getElementById("printButton").addEventListener("click", printUI);
});



export {
    handleSubmit,
    updateUI,
    clearUI,
    setMaxDate,
    setReturning,
    printUI
}