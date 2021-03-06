/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import {
	untitledMenu,
	useMenuEntity,
	useSelectedMenuData,
	IsMenuNameControlFocusedContext,
} from '../../hooks';

import { sprintf, __ } from '@wordpress/i18n';
export default function NameDisplay() {
	const { menuId } = useSelectedMenuData();
	const { editedMenu } = useMenuEntity( menuId );
	const [ , setIsMenuNameEditFocused ] = useContext(
		IsMenuNameControlFocusedContext
	);

	const menuName = editedMenu?.name ?? untitledMenu;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					aria-label={ sprintf(
						// translators: %s: the name of a menu.
						__( `Edit menu name: %s` ),
						menuName
					) }
					onClick={ () => setIsMenuNameEditFocused( true ) }
				>
					{ menuName }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}
