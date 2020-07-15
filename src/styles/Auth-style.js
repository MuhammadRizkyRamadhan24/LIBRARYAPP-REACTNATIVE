import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top:0
    },

    wrapperLogo: {
        flex: 2
    },
    logo: {
        width:423,
        height:222,
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    logoOpen: {
        width:110,
        height:108,
        position: 'absolute',
        top: 15
    },
    logoClose: {
        width:185,
        height:180,
        top:50
    },

    wrapperForm: {
        flex: 4,
        justifyContent: 'center',
        alignItems:'center'
    },
    formTitle: {
        fontSize: 30,
        color: 'white',
        bottom: 20,
        fontFamily: 'Gotham_Medium'
    },
    formBox: {
        width: 400,
        height: 235,
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        borderRadius: 30
    },
    form: {
        marginHorizontal: 15  
    },
    formLabel: {
        color: 'white',
        fontFamily: 'SanFranciscoPro'
    },
    formInput: {
        color: '#FFF',
        fontFamily: 'SanFranciscoPro'
    },

    button: {
        top: 40,
        borderRadius: 30,
        backgroundColor: '#F6C12D'
    },
    buttonText: {
        fontSize: 20,color: 'white', fontFamily: 'SanFranciscoPro'
    },

    wrapperOnpress: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    onpressText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'SanFranciscoPro'
    },
    onpressTouch: {
        color: 'white',
        fontSize: 18,
        fontWeight:"bold",
        fontFamily: 'SanFranciscoPro'
    }
})

module.exports = styles;