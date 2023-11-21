import { styled } from 'styled-components';

export const RepliesContainer = styled.div`
  position: relative;
  width: 80%;
  margin: 12px auto;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #349e81;
`;
export const PostContainer = styled.div`
  position: relative;
  width: 80%;
  height: 30vh;
  margin: 12px auto;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
`;

export const AddCommentContainer = styled.div`
  position: relative;
  width: 80%;
  height: 20vh;
  margin: 12px auto;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #349e81;
`;

export const ReplyContainer = styled.div`
  display: flex;
  width: 80%;
  height: 64px;
  margin: 12px auto;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  align-items: center;
`;
export const ReplyComment = styled.span`
  white-space: pre-wrap;
`;
export const ReplyAvatar = styled.img`
  height: 50px;
  width: 50px;
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 8px 12px;
  z-index: 1;
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-left: auto;

  &:hover .dropdown-content {
    display: block;
  }
`;



