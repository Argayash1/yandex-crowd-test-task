import stagesCards from "./stagesCards.js";
import { participants } from "./participants.js";

const leadSectionElement = document.querySelector(".lead");
const participantsSectionElement = document.querySelector(".participants");
const stagesListElement = document.querySelector(".stages__list");
const participantListElement = document.querySelector(".participants__list");

const elementTemplate = document
  .querySelector("#running-line-template")
  .content.querySelector(".running-line");

const stageCardTemplate = document
  .querySelector("#stage-card-template")
  .content.querySelector(".stage-card");

const participantCardTemplate = document
  .querySelector("#participant-card-template")
  .content.querySelector(".participant-card");

const createElement = () => {
  const elementElement = elementTemplate.cloneNode(true);
  return elementElement;
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

const createParticipantCard = (item) => {
  const participantCardElement = participantCardTemplate.cloneNode(true);
  const participantCardElementTitle = participantCardElement.querySelector(
    ".participant-card__title"
  );
  const participantCardElementSubtitle = participantCardElement.querySelector(
    ".participant-card__subtitle"
  );

  participantCardElementTitle.textContent = item.name;
  participantCardElementSubtitle.textContent = item.title;

  return participantCardElement;
};

const renderElement = (wrapElement, createElementFunction, item = null) => {
  const element = item ? createElementFunction(item) : createElementFunction();
  wrapElement.append(element);
};

renderElement(leadSectionElement, createElement);
renderElement(participantsSectionElement, createElement);

stagesCards.forEach((item) => {
  renderElement(stagesListElement, createStageCard, item);
});

participants.forEach((item) => {
  renderElement(participantListElement, createParticipantCard, item);
});
