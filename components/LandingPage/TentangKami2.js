import { Image } from "react-bootstrap";
import { TextSecondary } from "components/Typography/Text";
import { HeadingXXL, HeadingMD } from "components/Typography/Headings";
import HalfHalf from "components/HalfHalf/HalfHalf";

export default function TentangKami() {
	const left = (
		<>
			<HeadingMD as="h2" className="mt-1 text-white">
				dengan
			</HeadingMD>
			<HeadingXXL as="h2" className="mt-2 text-blue">
				TERBAIK
			</HeadingXXL>
			<HeadingMD as="h2" className="mt-1 text-white">
				di bidangnya
			</HeadingMD>
		</>
	);

	const right = (
		<>
			<div className="d-flex flex-lg-row flex-column">
				<div className="d-flex flex-column align-items-center mr-lg-5 mr-0">
					<Image src="/images/plcholder.png" width={160} roundedCircle />
					<TextSecondary className="mt-5 text-white text-justify">
						Eric Christopher Simowibowo, mentor course How to be confident 21
						days, berlatar pendidikan di universitas ternama dan pengalaman di
						bidang graphology selama 12 tahun
					</TextSecondary>
				</div>
				<div className="d-flex flex-column align-items-center">
					<Image src="/images/plcholder.png" width={160} roundedCircle />
					<TextSecondary className="mt-5 text-white text-justify">
						William Christopher Simowibowo, Enteprenur muda yang berpengalaman
						di bidang kebugaran dan kesehatan Telah disertifikasi di negara
						Eropa dan sudah mengajar banyak siswa kurang lebih 5 tahun
					</TextSecondary>
				</div>
			</div>
		</>
	);
	return <HalfHalf left={left} right={right} />;
}
