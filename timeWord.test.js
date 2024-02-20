describe("timeWord", () => {
  test("returns Midnight for 00:00", () => {
    expect(timeWord("00:00")).toBe("Midnight");
  });

  test("returns Noon for 12:00", () => {
    expect(timeWord("12:00")).toBe("Noon");
  });

  test("handles single digit hours", () => {
    expect(timeWord("5:30")).toBe("five thirty am");
  });

  test("handles single digit minutes", () => {
    expect(timeWord("10:5")).toBe("ten oh five am");
  });

  test("handles minutes over 20", () => {
    expect(timeWord("11:25")).toBe("eleven twenty five am");
  });

  test("returns correct am/pm", () => {
    expect(timeWord("13:15")).toBe("one fifteen pm");
  });

  test("trims whitespace from output", () => {
    expect(timeWord("3:04")).toBe("three o'clock am");
  });
});
