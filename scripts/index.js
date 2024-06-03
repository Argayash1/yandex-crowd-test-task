import stagesCards from "./stagesCards.js";
import { participants } from "./participants.js";

const leadSectionElement = document.querySelector(".lead");
const participantsSectionElement = document.querySelector(".participants");
const stagesListElement = document.querySelector(".stages__list");
const participantListElement = participantsSectionElement.querySelector(
  ".participants__list"
);
const participantsSlideNumber = participantsSectionElement.querySelector(
  ".participants__slide-number"
);
const participantsCount = participantsSectionElement.querySelector(
  ".participants__slide-number_type_all"
);
const participantsPrevButton = participantsSectionElement.querySelector(
  ".participants__button"
);
const participantsNextButton = participantsSectionElement.querySelector(
  ".participants__button_type_next"
);

const elementTemplate = document
  .querySelector("#running-line-template")
  .content.querySelector(".running-line");

const stageCardTemplate = document
  .querySelector("#stage-card-template")
  .content.querySelector(".stage-card");

const participantCardTemplate = document
  .querySelector("#participant-card-template")
  .content.querySelector(".participant-card");

let stagesSliderCount = 0;
let participantsSliderCount = 0;

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

const setParticipantsSlideNumber = (slideNumber) => {
  participantsSlideNumber.textContent = slideNumber;
};

const setParticipantsCount = () => {
  participantsCount.textContent = `/  ${participants.length}`;
};

const renderElement = (wrapElement, createElementFunction, item = null) => {
  const element = item ? createElementFunction(item) : createElementFunction();
  wrapElement.append(element);
};

const rollSlider = (slidesList, offset, sliderCount) => {
  slidesList.style.transform = `translateX(-${sliderCount * offset}px)`;
};

const changeToNextSlide = (slidesList, sliderCount, sliderButtons) => {
  const slides = slidesList.querySelectorAll("li");
  const offset =
    slides[0].offsetWidth +
    +window
      .getComputedStyle(slidesList)
      .getPropertyValue("gap")
      .replace("px", "");

  sliderCount++;
  sliderButtons.prevButton.disabled = false;

  if (sliderCount > slides.length - 3) {
    sliderCount = 0;
    sliderButtons.prevButton.disabled = true;
  }

  rollSlider(slidesList, offset, sliderCount);

  if (slidesList.classList.contains("participants__list")) {
    participantsSlideNumber.textContent = sliderCount + 3;

    sliderButtons.nextButton.disabled =
      sliderCount === slides.length - 3 ? true : false;
  }

  return sliderCount;
};

const changeToPrevSlide = (slidesList, sliderCount, sliderPrevButton) => {
  const slides = slidesList.querySelectorAll("li");
  const offset =
    slides[0].offsetWidth +
    +window
      .getComputedStyle(slidesList)
      .getPropertyValue("gap")
      .replace("px", "");

  sliderCount--;

  sliderPrevButton.disabled = sliderCount === 0 ? true : false;

  rollSlider(slidesList, offset, sliderCount);

  if (slidesList.classList.contains("participants__list")) {
    participantsSlideNumber.textContent = sliderCount + 3;
  }

  return sliderCount;
};

renderElement(leadSectionElement, createElement);
renderElement(participantsSectionElement, createElement);

stagesCards.forEach((item) => {
  renderElement(stagesListElement, createStageCard, item);
});

participants.forEach((item) => {
  renderElement(participantListElement, createParticipantCard, item);
});

setParticipantsCount();
setParticipantsSlideNumber(participants.length - 3);

setInterval(() => {
  participantsSliderCount = changeToNextSlide(
    participantListElement,
    participantsSliderCount,
    { nextButton: participantsNextButton, prevButton: participantsPrevButton }
  );
}, 4000);

participantsPrevButton.addEventListener("click", () => {
  participantsSliderCount = changeToPrevSlide(
    participantListElement,
    participantsSliderCount,
    participantsPrevButton
  );
});

participantsNextButton.addEventListener("click", () => {
  participantsSliderCount = changeToNextSlide(
    participantListElement,
    participantsSliderCount,
    { nextButton: participantsNextButton, prevButton: participantsPrevButton }
  );
});
