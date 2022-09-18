import {
    TouchableOpacity,
    TouchableOpacityProps,
    ImageBackground,
    ImageSourcePropType,
    Text
} from 'react-native';

import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProp {
    id: string;
    title: string;
    banner: string;
    _count: {
        ads: number
    }
}

interface Props extends TouchableOpacityProps {
    data: GameCardProp
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground style={styles.cover} source={{uri:data.banner}} >

                <LinearGradient colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.ads} anúncios
                    </Text>

                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}