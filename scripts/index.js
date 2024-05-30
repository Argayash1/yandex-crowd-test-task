import stagesCards from "./stagesCards.js";

const leadSectionElement = document.querySelector(".lead");
const participantsSectionElement = document.querySelector(".participants");
const stagesListElement = document.querySelector(".stages__list");

const elementTemplate = document
  .querySelector("#running-line-template")
  .content.querySelector(".running-line");

const stageCardTemplate = document
  .querySelector("#stage-card-template")
  .content.querySelector(".stage-card");

const createElement = () => {
  const elementElement = elementTemplate.cloneNode(true);
  return elementElement;
};

const renderElement = (wrapElement, createElementFunction, item = null) => {
  const element = item ? createElementFunction(item) : createElementFunction();
  wrapElement.append(element);
};

const createStageCard = (item) => {
  const stageCardElement = stageCardTemplate.cloneNode(true);
  const stageCardElementNumber = stageCardElement.querySelector(
    ".stage-card__number"
  );
  const stageCardElementText =
    stageCardElement.querySelector(".stage-card__text");
  stageCardElementNumber.textContent = item.number;
  stageCardElementText.textContent = item.text;

  return stageCardElement;
};

renderElement(leadSectionElement, createElement);
renderElement(participantsSectionElement, createElement);

stagesCards.forEach((item) => {
  renderElement(stagesListElement, createStageCard, item);
});
