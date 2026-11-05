'use client';

import { styled } from '@mui/material/styles';
import { galleryWidth, surfaces } from '../../theme/Theme';

interface ImageEntry {
  id: string;
  width: number;
  height: number;
  detail: boolean;
  alt: string;
  caption: string;
}

const Band = styled('div')(({ theme }) => ({
  backgroundColor: surfaces.light,
  padding: theme.spacing(4, 2),
  '&:nth-of-type(even)': { backgroundColor: surfaces.dark },
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(6, 3) },
}));

const Figure = styled('figure')(({ theme }) => ({
  margin: '0 auto',
  width: 'fit-content',
  maxWidth: `min(100%, ${galleryWidth}px)`,
  '& figcaption': { marginTop: theme.spacing(1.5), color: theme.palette.text.secondary },
}));

const Image = styled('img')({
  display: 'block',
  maxWidth: '100%',
  maxHeight: '85svh',
  width: 'auto',
  height: 'auto',
  '&[data-detail="true"]': { maxHeight: 'none' },
});

export default function Gallery({ entries }: { entries: ImageEntry[] }) {
  return <div>{entries.map(({ id, width, height, alt, caption, detail }, index) => (
    <Band key={id}>
      <Figure>
        <Image src={`/pilot-media/${id}.webp`} alt={alt} width={width} height={height}
          data-detail={detail} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
        <figcaption>{caption}</figcaption>
      </Figure>
    </Band>
  ))}</div>;
}
