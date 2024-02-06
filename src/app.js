const checkInputBtn = document.querySelector(".checkmark");
const inputText = document.querySelector(".input-text");
const list = document.querySelector("ul");
const active = document.getElementsByClassName("active");
const btnClear = document.querySelector(".list__bottom-lastspan span");
const defaultInfo = document.querySelector(".default-state");
const theme = document.querySelector("#theme");
const styleTheme = document.querySelector("#style-theme");
let getLi = [...document.getElementsByClassName("drag")];
let validationArray = [];
let deleteIcon = [...document.getElementsByClassName("delate-list")];
let listElement = [...document.getElementsByClassName("checkmark-list")];
let countActive = active.length;
let isThemeLight = true;

// UPDATE PAGE
const refreshState = () => {
	listElement = [...document.getElementsByClassName("checkmark-list")];
	deleteIcon = [...document.getElementsByClassName("delate-list")];
	getLi = [...document.getElementsByClassName("drag")];
	countActive = listElement.length - active.length;
	document.querySelector(
		".list__bottom-firstspan span"
	).textContent = `${countActive} items left`;
};
// DEFAULT INFROMATION
const defaultState = () => {
	if (listElement.length == 0) {
		validationArray = [];
		defaultInfo.style.display = "flex";
	} else {
		defaultInfo.style.display = "none";
	}
};
// CHECKBOX STATE ACTIVE
const liElement = (span, text, img) => {
	span.addEventListener("click", () => {
		span.classList.toggle("active");
		if (isThemeLight) {
			if (span.classList.contains("active")) {
				img.classList.add("display");
				text.style.textDecorationLine = "line-through";
				text.style.color = "hsl(233, 11%, 84%)";
			} else {
				img.classList.remove("display");
				text.style.textDecorationLine = "none";
				text.style.color = "hsl(235, 19%, 35%)";
			}
		} else {
			if (span.classList.contains("active")) {
				img.classList.add("display");
				text.style.textDecorationLine = "line-through";
				text.style.color = "rgb(119, 122, 146)";
			} else {
				img.classList.remove("display");
				text.style.textDecorationLine = "none";
				text.style.color = "hsl(0, 0%, 98%)";
			}
		}
		refreshState();
	});
};
// ADD ELEMENT TO UL

const checkIcon = document.querySelector(".check-icon-main");
const inputValue = () => {
	let input = document.querySelector(".input-text").value;
	if (input === "") {
		checkInputBtn.classList.remove("active");
		checkIcon.style.display = "none";
	} else {
		checkInputBtn.classList.add("active");
		checkIcon.style.display = "block";
	}
	if (validationArray.includes(`${input.toLowerCase()}`)) {
		return "";
	} else {
		return input;
	}
};
const addListItem = (e) => {
	const input = inputValue();
	if (input === "" && e.keyCode === 13) {
		e.preventDefault();
		return;
	} else if (e.keyCode === 13) {
		e.preventDefault();
		const createLi = document.createElement("li");
		createLi.innerHTML = `<span class="checkmark-list"
		><img src="/src/images/icon-check.svg" alt="check icon" class="check-icon"
		/></span
	>${input}<span class="delate-list"
		><img src="/src/images/icon-cross.svg" alt="cross icon"
	/></span>`;
		checkInputBtn.classList.remove("active");
		list.appendChild(createLi);
		validationArray.push(createLi.textContent.toLowerCase());
		document.querySelector(".input-text").value = "";
		checkIcon.style.display = "none";
		createLi.setAttribute("draggable", true);
		createLi.classList.add("drag");
		refreshState();
		liElement(createLi.children[0], createLi, createLi.children[0].children[0]);
		deleteList();
		defaultState();
	}
};

inputText.addEventListener("input", inputValue);
inputText.addEventListener("keydown", addListItem);

// REMOVE ELEMENT FROM UL
let deletedItem = "";
function deleteFromArray() {
	const arrayIndex = validationArray.indexOf(deletedItem);
	if (!(validationArray.indexOf(deletedItem) === -1)) {
		validationArray.splice(arrayIndex, 1);
	}
}
const deleteList = () => {
	deleteIcon.forEach((element) => {
		element.addEventListener("click", () => {
			deletedItem = element.parentNode.textContent;
			element.parentNode.remove();
			refreshState();
			defaultState();
			deleteFromArray();
		});
	});
};
// BUTTON CLEAR COMPLETED
let clearArray = [];
function clearFromArray() {
	clearArray.forEach((element) => {
		const index = validationArray.indexOf(element);
		if (!(validationArray.indexOf(element) === -1)) {
			validationArray.splice(index, 1);
		}
	});
	clearArray = [];
}
const clearCompleted = () => {
	const activeLi = document.querySelectorAll(".active");
	activeLi.forEach((element) => {
		clearArray.push(element.parentNode.textContent);
		element.parentNode.remove();
		refreshState();
		defaultState();
		clearFromArray();
	});
};
btnClear.addEventListener("click", clearCompleted);

// FILTER LIST
const bottomButtons = document.querySelectorAll(".list__bottom-buttons span");

bottomButtons.forEach((element) => {
	element.addEventListener("click", () => {
		document.querySelector(".active-button")?.classList.remove("active-button");
		element.classList.add("active-button");
	});
});

const filterCompleted = () => {
	listElement.forEach((element) => {
		if (element.classList.contains("active")) {
			element.parentElement.style.display = "flex";
		} else {
			element.parentElement.style.display = "none";
		}
	});
};
const filterActive = () => {
	listElement.forEach((element) => {
		if (!element.classList.contains("active")) {
			element.parentElement.style.display = "flex";
		} else {
			element.parentElement.style.display = "none";
		}
	});
};
const filterAll = () => {
	listElement.forEach((element) => {
		element.parentElement.style.display = "flex";
	});
};
bottomButtons[0].addEventListener("click", filterAll);
bottomButtons[1].addEventListener("click", filterActive);
bottomButtons[2].addEventListener("click", filterCompleted);

// THEME DARK/LIGHT
const changeTheme = () => {
	if (!isThemeLight) {
		styleTheme.setAttribute("href", "/src/style.css");
		theme.setAttribute("src", "/src/images/icon-moon.svg");
		isThemeLight = true;
	} else {
		styleTheme.setAttribute("href", "src/styleDark.css");
		theme.setAttribute("src", "/src/images/icon-sun.svg");
		isThemeLight = false;
	}
};

theme.addEventListener("click", changeTheme);

// DRAG ELEMETNS
