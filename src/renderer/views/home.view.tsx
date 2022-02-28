import { Card, CardActionArea, CardContent, Divider, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
	Add as AddIcon,
	FolderOpen as FolderOpenIcon,
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export const HomeView = () => {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	return (
		<Grid container spacing={2} p={2} dir={i18n.language === 'en' ? 'ltr' : 'rtl'}>
			<Grid item xs={12} container spacing={2}>
				<Grid item xs={12}><Typography variant='h4'>{t('titles.new')}</Typography></Grid>
				<Grid item xs={12}><Divider /></Grid>
				<Grid item xs={12} container spacing={2}>
					<Grid item>
						<Tooltip title={t('descriptions.new') as string}>
							<Card sx={{ width: 250, height: 250 }}>
								<CardActionArea onClick={() => navigate('/new')}>
									<CardContent sx={{
										width: 250,
										height: 250,
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}>
										<AddIcon sx={{ fontSize: 160 }} />
									</CardContent>
								</CardActionArea>
							</Card>
						</Tooltip>
					</Grid>
				</Grid>
				<Grid item xs={12}><Typography variant='h4'>{t('titles.recent')}</Typography></Grid>
				<Grid item xs={12}><Divider /></Grid>
				<Grid item xs={12} container spacing={2}>
					<Grid item>
						<Tooltip title={t('descriptions.open') as string}>
							<Card sx={{ width: 250, height: 250 }}>
								<CardActionArea onClick={() => navigate('/open')}>
									<CardContent sx={{
										width: 250,
										height: 250,
										textAlign: 'center',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}>
										<FolderOpenIcon sx={{ fontSize: 160 }} />
									</CardContent>
								</CardActionArea>
							</Card>
						</Tooltip>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
