const BridgeMaker = require("../src/BridgeMaker");
const BridgeRandomNumberGenerator = require("../src/BridgeRandomNumberGenerator");
const GameController = require("../src/Controller/GameController");
const BridgeGame = require("../src/Model/BridgeGame");

const ExceptionHandler = require("../src/utils/ExceptionHandler");

const gameController = new GameController();

describe("다리 건너기 테스트", () => {
  test("다리 생성 길이 테스트", () => {
    const size = 3;
    expect(BridgeMaker.makeBridge(size, BridgeRandomNumberGenerator.generate).length).toBe(size);
  });

  test("다리 생성 UPDOWN 테스트", () => {
    const size = 2;
    const upDownMock = jest.fn();

    const upDownMocks = upDownMock.mockReturnValueOnce("1").mockReturnValueOnce("0");

    expect(BridgeMaker.makeBridge(size, upDownMocks)).toEqual(["U", "D"]);
  });

  test.each([["2"], ["21"]])("다리 길이 입력 범위에 대한 예외 처리", (input) => {
    const size = input;
    const validateTest = (size) => {
      ExceptionHandler.validateSizeInput(size);
    };
    expect(validateTest(size)).toBeFalsy();
  });

  test("게임 진행 다리 생성 테스트", () => {
    const bridgeGame = new BridgeGame(1);
    bridgeGame.answerBridge = ["U"];

    expect(bridgeGame.createUpDownBridges("U")).toEqual(["[ O ]", "[   ]"]);
  });

  test("게임 진행 다리 연장 테스트", () => {
    const bridgeGame = new BridgeGame(2);
    bridgeGame.answerBridge = ["U", "U"];

    bridgeGame.createBridges("U");

    expect(bridgeGame.extendUpDownBridges("U")).toEqual(["[ O | O ]", "[   |   ]"]);
  });
});
