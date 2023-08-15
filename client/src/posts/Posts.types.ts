export type PostProps = {
  title: string;
  message: string;
  files: string[];
  link: string;
};

export interface IPost {
  post_id: string;
  profile_name: string;
  title: string;
  message: string;
  createdAt: string;
  files: string[];
}

export interface PostFormData {
  message: string;
  title: string;
  files: FileList;
}

export interface PostImageCarouselProps {
  images: string[];
  link: string;
}

