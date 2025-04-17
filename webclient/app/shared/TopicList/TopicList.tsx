import {
	ItemsBox,
	ItemsCard,
	ItemsCardDescription,
	ItemsCardTitle,
	ItemsTitle,
} from './TopicList.styles'
import { StyledLink } from '../../styles/Router'
import type { CardProps, ListProps } from './TopicList.types'

const TopicList = ({ children, title }: ListProps) => {
	return (
		<ItemsBox>
			<ItemsTitle>{title}</ItemsTitle>
			{children}
		</ItemsBox>
	)
}

export const TopicCard = ({ children, description, link, title }: CardProps) => {
	return (
		<ItemsCard>
			<StyledLink to={link}>
				<ItemsCardTitle>{title}</ItemsCardTitle>
				<ItemsCardDescription>{description}</ItemsCardDescription>
			</StyledLink>
			{children}
		</ItemsCard>
	)
}

export default TopicList
