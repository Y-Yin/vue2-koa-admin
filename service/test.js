function f1() {
  try {
    console.log("代码执行");
    f2();
  } catch (error) {
    console.log("error", error);
  }
}

function f2() {
  setTimeout(() => {
    throw new Error("异常");
  }, 1000);
}

f1();
