import {colors} from './colors';

export const purpleBG = {
  btnStyle: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: colors.white,
  },
};

export const whiteBG = {
  btnStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  textStyle: {
    color: colors.black,
  },
};

export const whiteBGpurpleSD = {
  btnStyle: {
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
  },
  textStyle: {
    color: colors.black,
  },
};

export const whiteBGblackSD = {
  btnStyle: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
};
