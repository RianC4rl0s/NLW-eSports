import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width:"100%",
    padding:32
  },
  title:{
    color:THEME.COLORS.TEXT,
    fontFamily:THEME.FONT_FAMILY.BLACK,
    fontSize:THEME.FONT_SIZE.LG
  },
  subtitle:{
    color:THEME.COLORS.CAPTION_400,
    fontSize:THEME.FONT_SIZE.MD,
    fontFamily:THEME.FONT_FAMILY.REGULAR
  }
});