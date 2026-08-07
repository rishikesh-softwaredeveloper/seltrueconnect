import React,{useState} from "react";
import { View, Text, TouchableOpacity ,StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import * as Print from 'expo-print';
import RNPrint from 'react-native-print';
import { PostGetInvoice } from "../services/bundle-services/post-get-invoice";
import { PostGetInvoiceItems } from "../services/bundle-services/post-get-invoice_items";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";

const TotalOrderItem = (orderItem) => {
    const [selectedPrinter, setSelectedPrinter] = useState();
    const types = ["Invoice", "Items"];
    const token = useSelector((state) => state.token);

    const print = (salesorder_id) => {
        const order_id={
            "order_id":salesorder_id
        }
        PostGetInvoice(order_id,token).then((Response)=>{
            console.log(Response);
            if(Response.status == 1){
                RNPrint.print({
                    html: createDynamicTable(Response.data),
                    fileName: 'Order',
                    base64: true,
                })
                // Print.printAsync({
                //     html: createDynamicTable(Response.data),
                //     printerUrl: selectedPrinter?.url, // iOS only
                // })
            }
        });
    }

    const print2 = (salesorder_id) => {
        const order_id={
            "order_id":salesorder_id
        }
        PostGetInvoiceItems(order_id,token).then((Response)=>{
            if(Response.status == 1){
                RNPrint.print({
                    html: createDynamicTable2(Response.data),
                    fileName: 'Order',
                    base64: true,
                })
                
                    // await RNPrint.print({ filePath: results.filePath })
                  
                // Print.printAsync({
                //     html: createDynamicTable2(Response.data),
                //     printerUrl: selectedPrinter?.url, // iOS only
                // })
            }
        });
    }
    
    const createDynamicTable2 = (item) => {
        const devices =item.invoice_items;
        var table ="";
        for(let i in devices){
            const item= devices[i];
            table= table + `
            <tr>
                <td>${item.product_name}</td>
                <td>${item.sku}</td>
                <td>${item.imei}</td>
                <td>${item.category}</td>
                <td>${item.device_id}</td>
                <td>1</td>
                <td>${item.price}</td>
            </tr>
            `
        }
        const html =`<!DOCTYPE html>
        <html>
        <meta charset="utf-8">
            <title><?= lang('invoice') ?></title>
            <head>
            <style type="text/css">
                font-face {
                    font-family: "Source Sans Pro", sans-serif;
                }
             
                .clearfix:after {
                    content: "";
                    display: table;
                    clear: both;
                }
        
                a {
                    color: #0087C3;
                    text-decoration: none;
                }
        
                body {
                    color: #555555;
                    background: #FFFFFF;
                    font-size: 9px;
                    font-family: "Source Sans Pro", sans-serif; 
                    width: 100%;
                    margin:0;
                }
        
                #header_logo{
                    float:left;
                }
                #header_title{
                    float:right;
                }
               
                #client_address p{
                    margin:0;
                }
                #ship_to p{
                    margin:0;
                }
              
                           
                #client_detail_table td {
                    width:110px;
                    border-bottom: 0.5px solid grey;
                    text-align: left;
                    padding-top: 0;
                    padding-bottom: 0;
                }
                 .left {text-align:left;}
                 .right {text-align:right !important;}
                 .center {text-align:center;}
        
                #invoice_table{ 
                    width:100%;
                    margin-left: 2px;
                    margin-right: 2px;
                }
               
                #invoice_table th, td, tr {
                    border-bottom: 0.5px solid grey;
                    padding-top: 4px;
                    padding-bottom: 2px;
                    margin: 0;
                    }
                #invoice_table .footer_table{
                        font-weight:bold;
                }
                #invoice_table th{
                    border-top: 0.5px solid grey;
                }
        
                header {
                        position: fixed;
                        top: -20px;
                        left: 0px;
                        right: 0px;
                        height: 20px; 
                        width: 100%;
        
                    }
        
                    footer {
                        position: fixed; 
                        bottom: 0; 
                        left: 0px; 
                        right: 0px;
                        height: 20px; 
                        border-top: 1px solid #AAAAAA;
                        color: #777777;
                        width: 100%;
                        padding: 8px 0;
                        text-align: center;
                    }
        
                .rupee::before{
                    padding-left:5px;
                    white-space:nowrap;
                }
        
                
                .footer_margin{
                    margin-bottom: 0;
                    margin-left : 1px;
                    position: absolute;
                    bottom: 0;
                    float:right;
                    font-size:12px;
                }
                .signature{
                    margin-bottom: 40px;
                    margin-left : 1px;
                    position: absolute;
                    bottom: 0;
                    float:right;
                    font-size:12px;
                }
                .container td{
                    border-bottom:none;
                }
        
            </style>
            </head>
            <body>
            <header>
                   
                </header>
        
            <footer id="footer"><span style="font-weight:bold;">SLOYD VENTURES (P) LTD,</span> 1-11-251/19A. 4th Floor, Jayalakshmi Towers, 
            Motilal Nehru Nagar, Begumpet, Hyderabad, Telangana, 500016, IN.<p style="margin:0;">|| CIN: U52390TG2012PTC083950 | PAN: AASCS2801C | Tel: +91-40-27900059 | Email: accounts@ynew.in | web: www.ynew.in ||</p>
        </footer>
           <table id="heading" style="text-align:center;width:100%;border-bottom:none;">
           <tr style="border-bottom:none;"><td style="align-content:left;text-align:left;border-bottom:none;"><img src="https://erp.sloyd.in/assets/img/logo_invoice.png" width="125px"></td>                  
                    <td  style="text-align:left;border-bottom:none;"><h1>Device List</h1></td>
                    
                    <td style="border-bottom:none;text-align:left;">
                        <div style="text-align:right;">
                        <table id="client_detail_table2" style="width: 210px;">
                            <tr>
                                <td class="left" style="text-align: left;">Customer Name</td>
                                <td class="left">${item.invoice_header.company}</td>
                            </tr>
                            <tr>
                                <td class="left">Invoice Number</td>
                                <td class="left">${item.invoice_header.invoice_number}</td>
                            </tr>
                            <tr>
                                <td class="left">Invoice Date</td>
                                <td class="left">${item.invoice_header.invoice_date}</td>
                            </tr>
                            
                        </table>
                    
                        </div></td></tr>
                </table>
                <table class="container" style="width:100%;">
                <tr><td  style="width:30%;vertical-align:top;">
                    
                    
                        </td></tr>
                    </table>
            
                <div id="invoice_div">
                    <table id="invoice_table" style="width:100%;" cellspacing="0">
                        <thead style="text-align: center;font-size:9px;">
                        <tr>
                            
                            <th style="text-align:left;white-space:nowrap;">Product Name</th>
                            <th style="white-space:nowrap;text-align:left">SKU</th>        
                            <th style="text-align:left;">IMEI No</th>
                            <th style="text-align:left;">Category</th>
                            <th style="text-align:left;">Device Id</th>
                            <th style="text-align:left;">Qty</th>
                            <th style="text-align:left;">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        <tr class="bottom-border">
                        ${table}
                        </tr>
                            
                        </tbody>
                        <tfoot class="footer_table">
                            
                            <tr style="line-height:15px;">
                                
                                <td colspan="5" >Total</td>
                                
                                <td  class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.total_quantity}</td>
                                <td  class="right" style="padding-bottom:2px;padding-top:2px;"><span class="rupee">${item.invoice_header.total_price}<span></td>
                            </tr>
                    </table>
                </div>
                    
                <div class="signature">
                </div>
                </body>
        </html>`
        return html;
    }
      const createDynamicTable = (item) => {
       
        const html = `
        <!DOCTYPE html>
        <html>
        <meta charset="utf-8">
            <title><?= lang('invoice') ?></title>
            <head>
            <style type="text/css">
                font-face {
                    font-family: "Source Sans Pro", sans-serif;
                }
             
                .clearfix:after {
                    content: "";
                    display: table;
                    clear: both;
                }
        
                a {
                    color: #0087C3;
                    text-decoration: none;
                }
        
                body {
                    color: #555555;
                    background: #FFFFFF;
                    font-size: 9px;
                    font-family: "Source Sans Pro", sans-serif; 
                    width: 100%;
                    margin:0;
                }
        
                #header_logo{
                    float:left;
                }
                #header_title{
                    float:right;
                }
               
                #client_address p{
                    margin:0;
                }
                #ship_to p{
                    margin:0;
                }
              
                           
                #client_detail_table td {
                    width:110px;
                    border-bottom: 0.5px solid grey;
                    text-align: left;
                    padding-top: 0;
                    padding-bottom: 0;
                }
                 .left {text-align:left;}
                 .right {text-align:right !important;}
                 .center {text-align:center;}
        
                #invoice_table{ 
                    width:100%;
                    margin-left: 2px;
                    margin-right: 2px;
                }
               
                #invoice_table th, td, tr {
                    border-bottom: 0.5px solid grey;
                    padding-top: 4px;
                    padding-bottom: 2px;
                    margin: 0;
                    }
                #invoice_table .footer_table{
                        font-weight:bold;
                }
                #invoice_table th{
                    border-top: 0.5px solid grey;
                }
        
                header {
                        position: fixed;
                        top: -20px;
                        left: 0px;
                        right: 0px;
                        height: 20px; 
                        width: 100%;
        
                    }
        
                    footer {
                        position: fixed; 
                        bottom: 0; 
                        left: 0px; 
                        right: 0px;
                        height: 20px; 
                        border-top: 1px solid #AAAAAA;
                        color: #777777;
                        width: 100%;
                        padding: 8px 0;
                        text-align: center;
                    }
        
                .rupee::before{
                    padding-left:5px;
                    white-space:nowrap;
                }
        
                
                .footer_margin{
                    margin-bottom: 0;
                    margin-left : 1px;
                    position: absolute;
                    bottom: 0;
                    float:right;
                    font-size:12px;
                }
                .signature{
                    margin-bottom: 40px;
                    margin-left : 1px;
                    position: absolute;
                    bottom: 0;
                    float:right;
                    font-size:12px;
                }
                .container td{
                    border-bottom:none;
                }
        
            </style>
            </head>
            <body>
            <header>
                   
                </header>
        
            <footer id="footer"><span style="font-weight:bold;">SLOYD VENTURES (P) LTD,</span> 1-11-251/19A. 4th Floor, Jayalakshmi Towers, 
            Motilal Nehru Nagar, Begumpet, Hyderabad, Telangana, 500016, IN.<p style="margin:0;">|| CIN: U52390TG2012PTC083950 | PAN: AASCS2801C | Tel: +91-40-27900059 | Email: accounts@ynew.in | web: www.ynew.in ||</p>
        </footer>
        <div class="footmargin"></div>
                <table id="heading" style="text-align:center;width:100%;border-bottom:none;">
                    <tr style="border-bottom:none;"><td style="align-content:left;text-align:left;border-bottom:none;"><img src="https://erp.sloyd.in/assets/img/logo_invoice.png" width="125px"></td>
                    <td  style="text-align:left;border-bottom:none;"><h1>Tax Invoice</h1></td>
                    <td style="border-bottom:none;"><div style="font-size:14px;font-weight:700;text-align:right;"><h2>Original for recipient</h2></div></td></tr>
                </table>
                <table class="container" style="width:100%;">
                <tr><td  style="width:30%;vertical-align:top;">
                    <div id="client_address">
                        <p>
                            <span style="font-weight:bold;">Bill To</span><br>
                            <p>${item.invoice_header.company}</p>
                            <p>${item.invoice_header.address}</p>
                            <p>${item.invoice_header.city}</p>
                            <p>${item.invoice_header.state}</p>
                            <p>INDIA ${item.invoice_header.pincode}</p> 
                            <p>GSTIN: ${item.invoice_header.gst_no}</p>
                            <p>PAN: ${item.invoice_header.pan_card}</p>
                        </p>
                    </div></td><td style="width:37%;text-align:left;padding-left:1px;vertical-align:top;">
                    <div id="ship_to" >
                            <span style="font-weight:bold;">Ship To</span><br>
                            <p>${item.invoice_header.company}</p>
                            <p>${item.invoice_header.address}</p>
                            <p>${item.invoice_header.city}</p>
                            <p>${item.invoice_header.state}</p>
                            <p>INDIA ${item.invoice_header.pincode}</p>
        
                    </div></td><td  style="width:33%;vertical-align:top;">
                    <div id="client_details">
                        <table id="client_detail_table">
                            <tr>
                                <td class="left" style="text-align: left;">GSTIN</td>
                                <td class="left">36AASCS2801C1ZI</td>
                            </tr>
                            <tr>
                                <td class="left">Invoice Number</td>
                                <td class="left">${item.invoice_header.invoice_code}</td>
                            </tr>
                            <tr>
                                <td class="left">Invoice Date</td>
                                <td class="left">${item.invoice_header.invoice_date}</td>
                            </tr>
                            <tr>
                                <td class="left">Order Number</td>
                                <td class="left">${item.invoice_header.salesorder_code}</td>
                            </tr>
                            <tr>
                                <td class="left">Payment Type</td>
                                <td class="left">${item.invoice_header.payment_type}</td>
                            </tr>
                            <tr>
                                <td class="left">Place of Supply</td>
                                <td class="left">${item.invoice_header.place_of_supply}</td>
                            </tr>
                            <tr>
                                <td class="left">HSN Code</td>
                                <td class="left">851712 - Mobile Phone</td>
                            </tr>
                            <tr>
                                <td class="left">Currency</td>
                                <td class="left">INR</td>
                            </tr>
                        </table>
                        </div>
                        </td></tr>
                    </table>
                    
                <p style="clear:both;"></p><br>
                <div id="invoice_div">
                    <table id="invoice_table" style="width:100%;" cellspacing="0">
                        <thead style="text-align: center;font-size:9px;">
                        <tr>
                            <th style="text-align:left;white-space:nowrap;">Product Name</th>
                            <th style="width: 10px;">Qty</th>
                            <th class="right">Price</th>
                            <th class="right">Taxable<p style="margin:0px;">Amount</p></th>
                            <th class="right">Exempt<p style="margin:0px;">Amount</p></th>
                            <th class="right">Tax<p style="margin:0px;">Rate</p></th>
                            <th class="right" style="padding-right:10px">Tax<p style="margin:0px;">Amount</p></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr style="line-height:15px;">
                                <td style="text-align:left;padding-bottom:2px;padding-top:2px;">${item.invoice_item.product_name}</td>
                                <td style="text-align:center;padding-bottom:2px;padding-top:2px;">${item.invoice_item.quantity}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.price}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.taxable_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.exempt_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">18%</td>
                                <td class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${item.invoice_item.tax_amount}</td>
                            </tr>
                    
                        <tfoot class="footer_table">
                            
                            <tr style="line-height:15px;">
                                <td colspan="2" >Gross Value</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.price}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.taxable_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.exempt_amount}</td>
                                <td colspan="2" class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${item.invoice_item.tax_amount}</td>
                            </tr>

                            <tr style="line-height:15px;">
                                <td colspan="2">Less: Discount</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.discount_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.discount_amount}</td>
                                <td class="right" colspan="2">18%</td>
                                <td class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${(0)}</td>
                            </tr>

                            <tr style="line-height:15px;">
                                <td colspan="2">Add: Freight</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.freight_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.freight_amount}</td>
                                <td class="right" colspan="2">18%</td>
                                <td class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${(0)}</td>
                            </tr>

                            <tr style="line-height:15px;">
                                <td colspan="2">Add: Insurance</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.insurance_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_header.insurance_amount}</td>
                                <td class="right" colspan="2">18%</td>
                                <td class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${(0)}</td>
                            </tr>
                   
                            <tr style="line-height:15px;">
                                <td colspan="2">Add: TCS @ ${item.invoice_item.tcs_percent} %</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.tcs_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${(0)}</td>
                                <td class="right" colspan="2">-</td>
                                <td class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${(0)}</td>
                            </tr>
                        
                            <tr style="line-height:15px;">
                                <td >Net Value</td>
                                <td style="text-align:center;padding-bottom:2px;padding-top:2px;">${item.invoice_item.quantity}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.net_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.taxable_amount}</td>
                                <td class="right rupee" style="padding-bottom:2px;padding-top:2px;">${item.invoice_item.exempt_amount}</td>
                                <td colspan="2" class="right" style="padding-bottom:2px;padding-top:2px;padding-right:10px"><span class="rupee">${item.invoice_item.tax_amount}</td>
                            </tr>

                            <tr style="line-height:15px;">
                                <td colspan="3">${item.invoice_item.amount_words}</td>    
                                
                                <td colspan="2" class="right" style="padding-bottom:2px;padding-top:1px;">IGST <span class="rupee">${item.invoice_item.tax_amount}</td>
                                <td colspan="2" class="right" style="padding-bottom:2px;padding-top:1px;padding-right:10px">
                                    CGST <span class="rupee">${item.invoice_item.tax_amount}
                                    &nbsp;| SGST <span class="rupee">${item.invoice_item.tax_amount} 
                                </td>
                            </tr>

                        </tfoot>
                    </table>
                    
                </div>
                <p></p><br>
                <p></p>
                     
                <div style="font-size:10px;">
                    <p>
                    <div style="page-break-inside:avoid;">
                    <div style="float:left;page-break-inside:avoid;width:60%;height:40px;">
                        <p style="font-weight: bold;">Notes</p>
                        <p>  Sales Code: ${item.invoice_header.sales_code} | Sales Channel: ${item.invoice_header.sales_channel}</p>
                        <p>  Sales Channel Ref. ID: ${item.invoice_header.saleschannel_ref_id}</p>
                        <p style="position:relative;font-weight:bold;text-align:right;">Thank you for your Business.</p>
                    </div>
                        <div style="float:right;page-break-inside:avoid;">
                                <br>
                            <span style="font-weight:700;">For Sloyd Ventures (P) Ltd.,</span>
                            <p style="width:50px;height:50px;"></p>
                            <p>Authorised Signature</p>
                        </div>
                    </div>
                    <p style="clear:both;"><br>
                    <p style="font-weight: bold;">Terms & Conditions:</p>
                       <p> 1. All products sold by YNew are either pre-owned or unboxed or refurbished unless it is explicitly stated</p>
                       <p>2. Please check the products for their specifications, physical damages and functional defects if any prior to acceptance</p>
                       <p>3. Please validate the IMEI/Serial numbers of the products as printed on this invoice against the devices received by you. However device IMEI/Serial numbers may not match with numbers mentioned on the box.</p>
                        <p>4. Goods once sold will not be taken back or exchanged</p>
                        <p>5. Warranties will be honored by respective manufacturer if it is applicable</p>
                        <p>6. If the products are sold with warranty void terms, we are not obliged to serve any warranty claims</p>
                        <p>7. Any warranties extended by company are subjected to terms and conditions as published from time to time</p>
                        <p>8. We are not responsible for transit damages or loss if any</p>
                        <p>9. Pre-owned mobile phones are secondhand goods fully/partly exempted under rule 32(5) of CGST Rules, 2017</p>
                        <p>10. Subject to Hyderabad/Secunderabad Jurisdiction. E&OE</p>
                        
                    </p>
                    
                </div>
        
        
                    
                <div class="signature">
                </div>
                </body>
        </html>
          `;
        return html;
      }

    
    const navigation = useNavigation();

    const OrderDetails=(Item)=>{
        navigation.navigate('OrderListScreen', {"orderItems":Item})    
    }
    
    for (var keys in orderItem) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>OrderDetails(orderItem['orderItem'])}>
                    <View style={styles.sub_container}>
                        <View style={{ borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 5,paddingBottom: 0,paddingLeft:15, borderRadius: 0, width: '50%' }}>
                            <View style={{ paddingBottom: 0 }}>
                                <View style={{ paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '600', color: "#000",fontFamily:'serif',fontSize:18 }}>{orderItem[keys].salesorder_code.toUpperCase()}</Text>
                                </View>

                                <View style={{ paddingBottom: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '600', color: "#000",fontFamily:'serif',fontSize:15 }}>{orderItem[keys].created_date}</Text>
                                </View>

                            </View>
                        </View>
                        
                        <View style={{  borderWidth: 0, borderColor: "#CCC", margin: 0, padding: 5, paddingBottom: 0,borderRadius: 0, width: '30%',marginRight: "5%",marginTop:0  }}>
                            <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
                                <View style={{ paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: '500', color: "#000",fontFamily:'serif',fontSize:18 }}>&#8377;{parseFloat(orderItem?.[keys]?.order_amount).toFixed(2)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-</Text>
                                </View>
                                <View style={{ paddingBottom: 15, flexDirection: 'row', justifyContent:'space-between' }}>
                                    <Text style={{ color:(orderItem[keys].status == 'INVOICED')?"#3d9446":"#DD2A05",fontSize:15,fontFamily:'serif',fontWeight:'500' }}>{(orderItem[keys].status == 'INVOICED')?orderItem[keys].status:"PENDING"}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',width: '20%',alignItems:'center'}}>
                            {
                                (orderItem['orderItem']['status'] == 'INVOICED')?(
                                    <SelectDropdown
                                    data={types}
                                    onSelect={(selectedItem, index) => {
                                        if(selectedItem == "Invoice"){
                                            print(orderItem['orderItem']['salesorder_id'])
                                        }
                                        if(selectedItem=="Items"){
                                            print2(orderItem['orderItem']['salesorder_id'])
                                        }
                                        
                                    }}
                                    defaultButtonText="Invoice"
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    renderDropdownIcon={(isOpened) => {
                                        return (
                                            <Icon
                                                size={40}
                                                name="file-pdf-box"
                                                color="red"
                                            />
                                        // <IconButton
                                        //     icon="camera"
                                        //     size={25}
                                        //     color="red"
                                        // />
                                        );
                                    }}
                                    buttonTextStyle={{fontSize:9,fontFamily:'serif'}}
                                    rowTextStyle ={{fontSize:10,fontFamily:'serif'}}
                                    buttonStyle={{flex: 1,borderRadius:25,height:35,
                                        backgroundColor:'#fff'
                                    }}
                                />
                                ):<View></View>
                            }
                        </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
};


const styles = StyleSheet.create({
container:{
    borderWidth: 1, 
    marginVertical: 5, 
    marginHorizontal: 5,
    margin: 0,
    padding:10, 
    borderRadius: 5,
    borderColor: "#cfcdcc",
    
},
sub_container:{ 
    flexDirection: 'row', 
    padding: 0,
    marginVertical:0,
    justifyContent:'space-evenly'
}

});
export default TotalOrderItem;