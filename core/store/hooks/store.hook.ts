import {useDispatch, useSelector} from 'react-redux';

import type {UnknownAction, Dispatch} from 'redux';
import type {TypedUseSelectorHook} from 'react-redux';
import {AppDispatch, RootState} from '../index';

export const useAppDispatch = (): Dispatch<UnknownAction> => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
