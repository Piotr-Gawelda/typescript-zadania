class App {
    enterNumber!: HTMLInputElement;
    sum1Input!: HTMLDivElement;
    avgInput!: HTMLDivElement;
    minInput!: HTMLDivElement;
    maxInput!: HTMLDivElement;

    constructor() {
        this.startApp();
    }

    startApp() {
        this.getInputs();
        this.inputsObserver();
    }

    inputsObserver() {
        this.enterNumber = document.querySelector('#enterNumber') as HTMLInputElement;
        this.enterNumber.addEventListener("input", () => this.generateInputs());
    }

    generateInputs() {
        var number = parseInt(this.enterNumber.value);
        var wrapper = document.querySelector('#input-wrapper') as HTMLDivElement;
        wrapper.innerHTML = "";
        if (number > 0) {
            for(var i =0; i< number; i++) {
                var div = document.createElement("div");
                div.id = "div" + i;
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                var button = document.createElement("button");
                button.innerText = "Usuń";
                button.id = "button" + i;
                button.addEventListener("click", (event) => this.removeInput(event));

                var input = document.createElement("input");
                input.type = "number";
                input.id = "input" + i;
                input.addEventListener("input", () => this.getStatistics());
                
                div.appendChild(input);
                div.appendChild(checkbox);
                div.appendChild(button);

                wrapper.appendChild(div);
            }
        }

        var button = document.createElement("button");
        button.innerText = "Usuń zaznaczone";
        button.id = "remove-selected"
        button.addEventListener("click", () => this.removeSelectedInput());

        var wrapper = document.querySelector('#button-wrapper') as HTMLDivElement;
        wrapper.replaceChildren(button);
    }

    removeSelectedInput() {
        var wrapper = document.querySelector("#input-wrapper");
        var toRemove: ChildNode[] = [];
        wrapper.childNodes.forEach(x => {
            var input = x.childNodes[1] as HTMLInputElement;
            var val = input.checked;
            if (val) {
                toRemove.push(x);
            }
        });

        toRemove.forEach((y: ChildNode) => {
            y.remove();
            this.getStatistics();
        });

    }

    removeInput(event: Event) {
        var bttn = event.target as HTMLButtonElement;
        var elem = bttn.parentNode as HTMLDivElement;
        elem.remove();
        this.getStatistics();
    }

    getInputs() {
        this.sum1Input = document.querySelector('#sum') as HTMLDivElement;
        this.avgInput = document.querySelector('#avg') as HTMLDivElement;
        this.minInput = document.querySelector('#min') as HTMLDivElement;
        this.maxInput = document.querySelector('#max') as HTMLDivElement;
    }

    setValue(element : HTMLDivElement, value: string) {
        element.innerText = value;
        element.classList.remove("loader");
    }

    getStatistics() {
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        var sum = 0;
        var avg = 0;
        var count = 0;
        var allHasValue = true;
        var wrapper = document.querySelector("#input-wrapper");


        wrapper.childNodes.forEach(x => {
            var input = x.firstChild as HTMLInputElement;
            var val = parseInt(input.value);
            
            if (Number.isNaN(val)) {
                allHasValue = false;
            } else {
                min = Math.min(min, val);
                max = Math.max(max, val);
                sum += val;
                count++;
            }
        });

        avg = sum / count;
        if (allHasValue && wrapper.childNodes.length > 0) {
            this.showStatistics(sum, avg, min, max);
        } else {
            this.showLoader();
        }
    }

    showLoader() {
        this.sum1Input.classList.add("loader");
        this.avgInput.classList.add("loader");
        this.minInput.classList.add("loader");
        this.maxInput.classList.add("loader");

        this.sum1Input.innerText = "";
        this.avgInput.innerText = "";
        this.minInput.innerText = "";
        this.maxInput.innerText = "";

    }

    showStatistics(sum: number, avg: number, min: number, max: number) {
        this.setValue(this.sum1Input, sum.toString());
        this.setValue(this.avgInput, avg.toString());
        this.setValue(this.minInput, min.toString());
        this.setValue(this.maxInput, max.toString());
    }
}

const app = new App();