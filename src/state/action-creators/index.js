//cart start
export const initItem = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_item',
            payload:add
        })
    }
}

export const addItem = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_item',
            payload:add
        })
    }
}

export const removeItem = (remove) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_item',
            payload:remove
        })
    }
}

export const removeOpenBoxItem = (remove) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_openbox_item',
            payload:remove
        })
    }
}

export const clearCart = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_cart'
        })
    }
}

//cart end

//orders start
export const initOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_order',
            payload:e
        })
    }
}

export const addOrder= (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_order',
            payload:e
        })
    }
}

export const removeOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_order',
            payload:e
        })
    }
}

export const clearOrder = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_order'
        })
    }
}

//order end

//Purchaseorders start
export const initPurchaseOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_purchaseorder',
            payload:e
        })
    }
}

export const addPurchaseOrder= (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_purchaseorder',
            payload:e
        })
    }
}

export const removePurchaseOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_purchaseorder',
            payload:e
        })
    }
}

export const clearPurchaseOrder = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_purchaseorder'
        })
    }
}

//Purchaseorder end

//Soldorder start
export const initSoldOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_soldorder',
            payload:e
        })
    }
}

export const addSoldOrder= (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_soldorder',
            payload:e
        })
    }
}

export const removeSoldOrder = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_soldorder',
            payload:e
        })
    }
}

export const clearSoldOrder = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_soldorder'
        })
    }
}

//Soldorder end

//payments start
export const initPayment = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_payment',
            payload:e
        })
    }
}

export const addPayment= (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_payment',
            payload:e
        })
    }
}

export const removePayment = (e) =>{
    return (dispatch) =>{
        dispatch({
            type:'remove_payment',
            payload:e
        })
    }
}

export const clearPayment = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_payment'
        })
    }
}

//payments end

//bundle start
export const initBundle = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_bundle',
            payload:add
        })
    }
}

export const addBundle = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_bundle',
            payload:add
        })
    }
}



export const clearBundle = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_bundle'
        })
    }
}
//bundle end

//open box start
export const initOpenBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_openbox',
            payload:add
        })
    }
}


export const addOpenBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_openbox',
            payload:add
        })
    }
}



export const clearOpenBox = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_openbox'
        })
    }
}
//openbox end


//master open box start
export const initMasterOpenBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_master_openbox',
            payload:add
        })
    }
}

export const clearMasterOpenBox = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_master_openbox'
        })
    }
}
//master openbox end


//price start
export const initPrice = (init)=>{
    return (dispatch) =>{
        dispatch({
            type:'init_price',
            payload:init
        })
    }
}

export const addPrice = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_price',
            payload:add
        })
    }
}

export const removePrice = (remove)=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_price',
            payload:remove
        })
    }
}

export const clearPrice = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_price',
        })
    }
}

//price end

//dealer start
export const addDealer = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_dealer',
            payload:add
        })
    }
}

export const removeDealer = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_dealer'
        })
    }
}

//dealer end

//profile start
export const addProfile = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_profile',
            payload:add
        })
    }
}

export const removeProfile = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_profile'
        })
    }
}

//profile end

//qnty start
export const initQnty = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_qnty',
            payload:add
        })
    }
}

export const addQnty = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_qnty',
            payload:add
        })
    }
}

export const removeQnty = (remove)=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_qnty',
            payload:remove
        })
    }
}

export const clearQnty = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_qnty'
        })
    }
}

//qnty end


//PAN START

export const addPan = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_pan',
            payload:add
        })
    }
}

export const removePan = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_pan'
        })
    }
}

//PAN END

//UPI START

export const addUpi=(add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_upi',
            payload:add
        })
    }
}

export const removeUpi = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_upi'
        })
    }
}

//UPI END

//GSTIN START

export const addGstin = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_gstin',
            payload:add
        })
    }
}

export const removeGstin = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_gstin'
        })
    }
}

//GSTIN END

//Aadhar START

export const addAadhar = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_aadhar',
            payload:add
        })
    }
}

export const removeAadhar = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_aadhar'
        })
    }
}

//Aadhar END

//types start
export const initTypes = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_types',
            payload:add
        })
    }
}

export const clearTypes = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_types'
        })
    }
}

//brands start
export const initBrands = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_brands',
            payload:add
        })
    }
}

export const clearBrands = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_brands'
        })
    }
}

//grades start
export const initGrades = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_grades',
            payload:add
        })
    }
}

export const clearGrades = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_grades'
        })
    }
}

//AccessToken start
export const initToken = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_token',
            payload:add
        })
    }
}

export const clearToken = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_token'
        })
    }
}

//RefreshToken start
export const initRefreshToken = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_refreshToken',
            payload:add
        })
    }
}

export const clearRefreshToken = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_refreshToken'
        })
    }
}

//SEARCH TYPE start
export const initSearchType = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_searchType',
            payload:add
        })
    }
}

export const clearSearchType = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_searchType'
        })
    }
}

//BundleName  start
export const initBundleName = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_bundleName',
            payload:add
        })
    }
}

export const clearBundleName = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_bundleName'
        })
    }
}


//SEARCH category start
export const initSearchCategory = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_searchCategory',
            payload:add
        })
    }
}

export const clearSearchCategory = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_searchCategory'
        })
    }
}

//Acct Name start
export const initAccountName = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_acct_name',
            payload:add
        })
    }
}

export const clearAccountName = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_acct_name'
        })
    }
}
//Acct Name end

//Acct Email start
export const initAccountEmail = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_acct_email',
            payload:add
        })
    }
}

export const clearAccountEmail = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_acct_email'
        })
    }
}
//Acct Email end

//Acct Mobile start
export const initAccountMobile = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_acct_mobile',
            payload:add
        })
    }
}

export const clearAccountMobile = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_acct_mobile'
        })
    }
}
//Acct Mobile end

//Acct Address start
export const initAccountAddress = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_acct_address',
            payload:add
        })
    }
}

export const clearAccountAddress = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_acct_address'
        })
    }
}
//Acct Address end

//shipping address start
export const initShippingAddress = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_shipping_address',
            payload:add
        })
    }
}


export const addShippingAddress = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_shipping_address',
            payload:add
        })
    }
}

export const clearShippingAddress = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_shipping_address'
        })
    }
}
//shipping address end

//Bank Accounts start
export const initBankAccounts = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_bankAccounts',
            payload:add
        })
    }
}


export const addBankAccounts = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_bankAccounts',
            payload:add
        })
    }
}

export const clearBankAccounts = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_bankAccounts'
        })
    }
}
//Bank Accounts end

//QR image start
export const initQrImage = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_qrImage',
            payload:add
        })
    }
}


export const addQrImage = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_qrImage',
            payload:add
        })
    }
}

export const clearQrImage = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_qrImage'
        })
    }
}
//QR image end

//VendorList start
export const initVendorList = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_vendorList',
            payload:add
        })
    }
}


export const addVendorList = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_vendorList',
            payload:add
        })
    }
}

export const clearVendorList = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_vendorList'
        })
    }
}
//VendorList end

//SalesPersonList start
export const initSalesPersonList = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_salesPersonList',
            payload:add
        })
    }
}


export const addSalesPersonList = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_salesPersonList',
            payload:add
        })
    }
}

export const clearSalesPersonList = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_salesPersonList'
        })
    }
}
//SalesPersonList end

//ParentIds START

export const initDealerIds = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'init_dealerIds',
            payload:add
        })
    }
}

export const clearDealerIds= ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_dealerIds'
        })
    }
}

export const removeDealerIds= (remove)=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_dealerIds',
            payload:remove
        })
    }
}

//ParentIds END

//Voucher Details start
export const initVoucherDetails = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_voucherDetails',
            payload:add
        })
    }
}


export const addVoucherDetails = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_voucherDetails',
            payload:add
        })
    }
}

export const clearVoucherDetails = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_voucherDetails'
        })
    }
}
//Voucher Details end


//Vocher start
export const initVocherId = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_vocher_id',
            payload:add
        })
    }
}

export const clearVocherId = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_vocher_id'
        })
    }
}
//Vocher end

//qnty start
export const initDiscount = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_discount',
            payload:add
        })
    }
}

export const addDiscount = (add)=>{
    return (dispatch) =>{
        dispatch({
            type:'add_discount',
            payload:add
        })
    }
}

export const removeDiscount = (remove)=>{
    return (dispatch) =>{
        dispatch({
            type:'remove_discount',
            payload:remove
        })
    }
}

export const clearDiscount = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_discount'
        })
    }
}


//PrimaryShippingAddress start
export const initPrimaryShipping = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_primary_shipping',
            payload:add
        })
    }
}

export const clearPrimaryShipping = ()=>{
    return (dispatch) =>{
        dispatch({
            type:'clear_primary_shipping'
        })
    }
}

//PrimaryShippingAddress End

//Seltrue box start
export const initSeltrueBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_seltruebox',
            payload:add
        })
    }
}


export const addSeltrueBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'add_seltruebox',
            payload:add
        })
    }
}



export const clearSeltrueBox = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_seltruebox'
        })
    }
}
//Seltrue box end


//master seltrue box start
export const initMasterSeltrueBox = (add) =>{
    return (dispatch) =>{
        dispatch({
            type:'init_master_seltruebox',
            payload:add
        })
    }
}

export const clearMasterSeltrueBox = () =>{
    return (dispatch) =>{
        dispatch({
            type:'clear_master_seltruebox'
        })
    }
}
//master seltrue box end