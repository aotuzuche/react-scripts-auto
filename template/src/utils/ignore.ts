function isType(target: any, type: string) {
  const targetType = {}.toString.call(target).toLowerCase();
  return targetType === `[object ${type}]`.toLowerCase();
}

function ignore(target: Record<string, any>, rule: string | string[]) {
  if (!target) {
    throw new TypeError('"target" is null or not defined.');
  } else if (!rule) {
    throw new TypeError('"rule" is null or not defined.');
  } else if (!isType(target, 'object')) {
    throw new TypeError('"target" must be typeof object.');
  } else if (!isType(rule, 'string') && !isType(rule, 'array')) {
    throw new TypeError('"rule" must be typeof string or array.');
  }

  let ruleArr: string[] = [];
  if (isType(rule, 'string')) {
    ruleArr = (rule as string).split(' ');
  }

  const resObject: Record<string, any> = {};

  Object.keys(target).forEach(key => {
    if (ruleArr.indexOf(key) === -1) {
      resObject[key] = target[key];
    }
  });

  return resObject;
}

export default ignore;
