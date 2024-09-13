import {
	ItemsBox,
	ItemsCard,
	ItemsCardDescription,
	ItemsCardTitle,
	ItemsTitle,
} from '../styles/Lists'
import { StyledLink } from '../styles/Router'
import type { CardProps, ListProps } from './Lists.types'

const ItemsList = ({ children, title }: ListProps) => {
	return (
		<ItemsBox>
			<ItemsTitle>{title}</ItemsTitle>
			{children}
		</ItemsBox>
	)
}

export const ItemCard = ({ children, description, link, title }: CardProps) => {
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

export default ItemsList
