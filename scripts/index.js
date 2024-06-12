import stagesCards from "./stagesCards.js";
import { participants } from "./participants.js";

const leadSectionElement = document.querySelector(".lead");
const stagesSectionElement = document.querySelector(".stages");
const stagesListElement = stagesSectionElement.querySelector(".stages__list");
const stagesPrevButton = stagesSectionElement.querySelector(".slider-button");
const stagesNextButton = stagesSectionElement.querySelector(
  ".slider-button_type_next"
);
const stageCircleButtons = stagesSectionElement.querySelector(
  ".stage__circle-buttons"
);
const participantsSectionElement = document.querySelector(".participants");
const participantListElement = participantsSectionElement.querySelector(
  ".participants__list"
);
const participantsSlideNumber = participantsSectionElement.querySelector(
  ".participants__slide-number"
);
const participantsCount = participantsSectionElement.querySelector(
  ".participants__slide-number_type_all"
);
const participantsPrevButton =
  participantsSectionElement.querySelector(".slider-button");
const participantsNextButton = participantsSectionElement.querySelector(
  ".slider-button_type_next"
);

const elementTemplate = document
  .querySelector("#running-line-template")
  .content.querySelector(".running-line");
const stageCardTemplate = document
  .querySelector("#stage-card-template")
  .content.querySelector(".stage-card");
const stageCircleTemplate = document
  .querySelector("#stage-circle-template")
  .content.querySelector(".stages__circle");
const participantCardTemplate = document
  .querySelector("#participant-card-template")
  .content.querySelector(".participant-card");

let stagesSliderCount = 0;
let participantsSliderCount = 0;
let screenWidth = window.screen.width;
let timeoutId;

const handleResize = () => {
  screenWidth = window.screen.width;
};

const delayedHandleResize = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    handleResize();
  }, 500);
};

const createElement = () => {
  const elementElement = elementTemplate.cloneNode(true);
  return elementElement;
};

const createStageCard = (item, index) => {
  const stageCardElement = stageCardTemplate.cloneNode(true);
  const stageCardElementNumber = stageCardElement.querySelector(
    ".stage-card__number"
  );
  const stageCardElementText =
    stageCardElement.querySelector(".stage-card__text");
  stageCardElementNumber.textContent = index + 1;
  stageCardElementText.textContent = item;

  return stageCardElement;
};

const createStageCircle = (index) => {
  const stageCircleElement = stageCircleTemplate.cloneNode(true);
  const stageCircleButton = stageCircleElement.querySelector(
    ".stages__circle-button"
  );

  if (index === 0) {
    stageCircleButton.classList.add("stages__circle-button_active");
  }

  stageCircleButton.addEventListener("click", () => {
    const slides = stagesListElement.querySelectorAll("li");

    stagesSliderCount = index;
    rollSlider(
      stagesListElement,
      stagesSliderCount === 0 ? 375 : 355,
      stagesSliderCount
    );
    changeToThisSlide(stagesSliderCount);
    setButtonsDisabled(
      { prevButton: stagesPrevButton, nextButton: stagesNextButton },
      stagesSliderCount === 0,
      stagesSliderCount === slides.length - 3
    );
  });

  return stageCircleElement;
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

const renderElement = (
  wrapElement,
  createElementFunction,
  item = null,
  index = null
) => {
  const element = item
    ? createElementFunction(item, index)
    : index || index === 0
    ? createElementFunction(index)
    : createElementFunction();
  wrapElement.append(element);
};

const rollSlider = (slidesList, offset, sliderCount) => {
  slidesList.style.transform = `translateX(-${sliderCount * offset}px)`;
};

const setButtonsDisabled = (
  buttons,
  isPrevButtonDisabled,
  isNextButtonDisabled
) => {
  const { prevButton, nextButton } = buttons;

  prevButton.disabled = isPrevButtonDisabled ? true : false;
  nextButton.disabled = isNextButtonDisabled ? true : false;
};

const changeToThisSlide = (index) => {
  const circleButtons = stageCircleButtons.querySelectorAll("button");
  circleButtons.forEach((circleButton) =>
    circleButton.classList.remove("stages__circle-button_active")
  );
  circleButtons[index].classList.add("stages__circle-button_active");
};

const changeToNextSlide = (slideChangeParams) => {
  let { slidesList, sliderCount, sliderButtons, sliderOffset } =
    slideChangeParams;

  const slides = slidesList.querySelectorAll("li");
  const isParticipantsSlider =
    slidesList.classList.contains("participants__list");
  const offset =
    sliderOffset ||
    slides[0].offsetWidth +
      +window
        .getComputedStyle(participantListElement)
        .getPropertyValue("gap")
        .replace("px", "");

  sliderCount++;

  if (isParticipantsSlider && sliderCount > slides.length - 3) {
    sliderCount = 0;
  }

  const isNextButtonDisabled = isParticipantsSlider
    ? sliderCount === slides.length - 3
    : sliderCount === slides.length - 3;
  const isPrevButtonDisabled = sliderCount === 0;

  setButtonsDisabled(sliderButtons, isPrevButtonDisabled, isNextButtonDisabled);

  rollSlider(slidesList, offset, sliderCount);

  if (isParticipantsSlider) {
    participantsSlideNumber.textContent = sliderCount + 3;
  } else {
    changeToThisSlide(sliderCount);
  }

  return sliderCount;
};

const changeToPrevSlide = (slideChangeParams) => {
  let { slidesList, sliderCount, sliderButtons, sliderOffset } =
    slideChangeParams;

  const slides = slidesList.querySelectorAll("li");
  const isParticipantsSlider =
    slidesList.classList.contains("participants__list");
  const offset =
    sliderOffset ||
    slides[0].offsetWidth +
      +window
        .getComputedStyle(participantListElement)
        .getPropertyValue("gap")
        .replace("px", "");

  sliderCount--;

  const isPrevButtonDisabled = sliderCount === 0;
  const isNextButtonDisabled = isParticipantsSlider
    ? sliderCount === slides.length - 3
    : sliderCount === slides.length - 3;

  setButtonsDisabled(sliderButtons, isPrevButtonDisabled, isNextButtonDisabled);

  rollSlider(slidesList, offset, sliderCount);

  if (isParticipantsSlider) {
    participantsSlideNumber.textContent = sliderCount + 3;
  } else {
    changeToThisSlide(sliderCount);
  }

  return sliderCount;
};

renderElement(leadSectionElement, createElement);
renderElement(participantsSectionElement, createElement);

stagesCards.forEach((item, index) => {
  renderElement(stagesListElement, createStageCard, item, index);
});

for (let i = 0; i < stagesCards.length - 2; i++) {
  renderElement(stageCircleButtons, createStageCircle, null, i);
}

participants.forEach((item) => {
  renderElement(participantListElement, createParticipantCard, item);
});

setParticipantsCount();
setParticipantsSlideNumber(participants.length - 3);

setInterval(() => {
  participantsSliderCount = changeToNextSlide({
    slidesList: participantListElement,
    sliderCount: participantsSliderCount,
    sliderButtons: {
      prevButton: participantsPrevButton,
      nextButton: participantsNextButton,
    },
  });
}, 4000);

window.addEventListener("resize", delayedHandleResize);

stagesPrevButton.addEventListener("click", () => {
  stagesSliderCount = changeToPrevSlide({
    slidesList: stagesListElement,
    sliderCount: stagesSliderCount,
    sliderButtons: {
      prevButton: stagesPrevButton,
      nextButton: stagesNextButton,
    },
    sliderOffset: stagesSliderCount === 1 ? 375 : 355,
  });
});

stagesNextButton.addEventListener("click", () => {
  stagesSliderCount = changeToNextSlide({
    slidesList: stagesListElement,
    sliderCount: stagesSliderCount,
    sliderButtons: {
      prevButton: stagesPrevButton,
      nextButton: stagesNextButton,
    },
    sliderOffset: stagesSliderCount === 0 ? 375 : 355,
  });
});

participantsPrevButton.addEventListener("click", () => {
  participantsSliderCount = changeToPrevSlide({
    slidesList: participantListElement,
    sliderCount: participantsSliderCount,
    sliderButtons: {
      prevButton: participantsPrevButton,
      nextButton: participantsNextButton,
    },
  });
});

participantsNextButton.addEventListener("click", () => {
  participantsSliderCount = changeToNextSlide({
    slidesList: participantListElement,
    sliderCount: participantsSliderCount,
    sliderButtons: {
      prevButton: participantsPrevButton,
      nextButton: participantsNextButton,
    },
  });
});
