import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import priceReducer from './priceReducer'
import dealerReducer from './dealerReducer'
import profileReducer from './profileReducer'
import bundleReducer from './bundleReducer'
import openBoxReducer from './openBoxReducer'
import seltrueBoxReducer from './seltrueBoxReducer'
import shippingAddressReducer from './shippingAddressReducer'
import bankAccountsReducer from './bankAccountsReducer'
import qrImageReducer from './qrImageReducer'
import vendorListReducer from './vendorListReducer'
import salesPersonListReducer from './salesPersonListReducer'
import voucherDetailsReducer from './voucherDetailsReducer'
import masterOpenBoxReducer from './masterOpenBoxReducer'
import masterSeltrueBoxReducer from './masterSeltrueBoxReducer'
import AcctNameReducer from './acctNameReducer'
import AcctEmailReducer from './acctEmailReducer'
import AcctMobileReducer from './acctMobileReducer'
import AcctAddressReducer from './acctAddressReducer'
import VocherIdReducer from './vocherIdReducer'
import quantityReducer from './quantityReducer'
import discountReducer from './discountReducer'
import orderReducer from './orderReducer'
import purchaseorderReducer from './purchaseorderReducer'
import soldorderReducer from './soldorderReducer'
import panReducer from './panReducer'
import upiReducer from './upiReducer'
import aadharReducer from './aadharReducer'
import gstinReducer from './gstinReducer'
import paymentReducer from './paymentReducer'
import typeReducer from './typesReducer'
import brandReducer from './brandsReducer'
import gradeReducer from './gradesReducer'
import tokenReducer from './tokenReducer'
import primaryShippingReducer from './primaryShippingReducer'
import refreshTokenReducer from './refreshTokenReducer'
import searchTypeReducer from './searchTypeReducer'
import searchCategoryReducer from './searchCategoryReducer'
import dealerIdReducer from './dealerIdsReducer'
import bundleNameReducer from './BundleNameReducer'

const appReducer = combineReducers({
    cartlist: cartReducer,
    sumprice: priceReducer,
    dealer:dealerReducer,
    profile:profileReducer,
    bundle:bundleReducer,
    openbox:openBoxReducer,
    seltruebox:seltrueBoxReducer,
    masteropenbox:masterOpenBoxReducer,
    masterseltruebox:masterSeltrueBoxReducer,
    AcctName:AcctNameReducer,
    AcctEmail:AcctEmailReducer,
    AcctMobile:AcctMobileReducer,
    AcctAddress:AcctAddressReducer,
    sumqnty: quantityReducer,
    discount:discountReducer,
    orderlist:orderReducer,
    purchaseOrderList:purchaseorderReducer,
    soldOrderList:soldorderReducer,
    pan:panReducer,
    upi:upiReducer,
    gstin:gstinReducer,
    aadhar:aadharReducer,
    paymentlist:paymentReducer,
    types:typeReducer,
    brands:brandReducer,
    grades:gradeReducer,
    token:tokenReducer,
    primaryShipping:primaryShippingReducer,
    refreshToken:refreshTokenReducer,
    searchType:searchTypeReducer,
    searchCategory:searchCategoryReducer,
    shippingAddress:shippingAddressReducer,
    bankAccounts:bankAccountsReducer,
    qrImages: qrImageReducer,
    vendorList:vendorListReducer,
    salesPersonList:salesPersonListReducer,
    voucherDetails:voucherDetailsReducer,
    vocherId:VocherIdReducer,
    dealerIdReducer:dealerIdReducer,
    bundleName:bundleNameReducer
})

const reducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }

    return appReducer(state, action);
};


export default reducers