import * as React from 'react';
import { StyleSheet, Text, Modal, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HeaderText } from './StyledText';
import { BigButton } from './Buttons';

type BarCodeModalProps = Modal['props'] & {
  onScan?: (data: string) => void;
};

export function BarCodeModal(props: BarCodeModalProps): React.ReactElement {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );
  let scannerView: React.ReactElement = (
    <Text>Requesting for camera permission</Text>
  );

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    props.onScan && props.onScan(data);
  };
  const handleDismissed = () => {
    props.onDismiss && props.onDismiss();
  };

  if (hasPermission === false) {
    scannerView = <Text>No access to camera</Text>;
  } else {
    scannerView = (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.scanner}
      />
    );
  }

  return (
    <Modal
      style={styles.centeredView}
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <HeaderText>Place barcode in the frame...</HeaderText>
          {scannerView}
          <BigButton style={styles.scanButton} onPress={handleDismissed}>
            Dismiss
          </BigButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    marginTop: '5%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width: '95%',
    padding: '10%',
    paddingTop: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanner: {
    marginTop: '5%',
    width: '100%',
    height: '65%',
  },
  scanButton: {
    marginTop: 'auto',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  dismissButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
});
