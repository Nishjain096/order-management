import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#f7f9fe",
    justifyContent: "space-evenly",
    marginHorizontal: 20,
  },
  sectionName: {
    width: "65%",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  section: {
    width: "15%",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    textAlign:"right"
  },
  sectionSr: {
    width: "8%",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  txtParticular: {
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 30,
  },
  txtInvoice: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 28,
    textDecoration: "underline",
  },
  txtCompanyName: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 34,
  },
});

// Create a  Component for printing
const PrintBill = (props) => {
  const { details, getSubTotal, taxAmount } = props;
  console.log("sub total", getSubTotal);
  return (
    <Document>
      <Page size="A4">
        <Text style={styles.txtCompanyName}>ProductsKart</Text>
        <Text style={styles.txtInvoice}>Invoice</Text>
        <Text style={styles.txtParticular}>Particulars</Text>
        <View style={styles.row}>
          <View style={styles.sectionSr}>
            <Text>Sr.</Text>
          </View>
          <View style={styles.sectionName}>
            <Text>Name</Text>
          </View>
          <View style={styles.section}>
            <Text>Price</Text>
          </View>
          <View style={styles.section}>
            <Text>Quantity</Text>
          </View>
          <View style={styles.section}>
            <Text>Total</Text>
          </View>
        </View>
        {details.map((ele, key) => {
          return (
            <View key={key} style={styles.row}>
              <View style={styles.sectionSr}>
                <Text>{key+1}</Text>
              </View>
              <View style={styles.sectionName}>
                <Text>{ele.name}</Text>
              </View>
              <View style={styles.section}>
                <Text>{ele.price}</Text>
              </View>
              <View style={styles.section}>
                <Text>{ele.quantity}</Text>
              </View>
              <View style={styles.section}>
                <Text>
                  $ {(ele.quantity * ele.price.replace("$", "")).toFixed(2)}{" "}
                </Text>
              </View>
            </View>
          );
        })}
        <Text style={{ marginTop: 40, alignSelf: "center", marginBottom: 15 }}>
          Submmary
        </Text>
        <View style={styles.row}>
          <View style={[styles.sectionName, { width: "85%" }]}>
            <Text>Sub Total</Text>
          </View>
          <View style={[styles.section, { width: "15%" }]}>
            <Text>$ {getSubTotal.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.sectionName, { width: "85%" }]}>
            <Text>Tax ({taxAmount}%)</Text>
          </View>
          <View style={[styles.section, { width: "15%" }]}>
            <Text>$ {((getSubTotal * taxAmount) / 100).toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.sectionName, { width: "85%" }]}>
            <Text>Total</Text>
          </View>
          <View style={[styles.section, { width: "15%" }]}>
            <Text>
              $ {((getSubTotal * taxAmount) / 100 + getSubTotal).toFixed(2)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrintBill;
