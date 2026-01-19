import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MyAvatar from "../Images/MyAvatar.avif";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElPricing, setAnchorElPricing] = React.useState(null);
	const [anchorElBlog, setAnchorElBlog] = React.useState(null);
	const [prices, setPrices] = React.useState({});

	React.useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
				const data = await response.json();
				setPrices(data);
			} catch (error) {
				console.error('Error fetching prices:', error);
			}
		};
		fetchPrices();
		const interval = setInterval(fetchPrices, 60000); // Update every minute
		return () => clearInterval(interval);
	}, []);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleOpenPricingMenu = (event) => {
		setAnchorElPricing(event.currentTarget);
	};
	const handleOpenBlogMenu = (event) => {
		setAnchorElBlog(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleClosePricingMenu = () => {
		setAnchorElPricing(null);
	};

	const handleCloseBlogMenu = () => {
		setAnchorElBlog(null);
	};

	return (
		<AppBar
			className="flex-row justify-center items-center"
			position="relative"
			color="primary"
		>
			<Container maxWidth="l" className="bg-black">
				<Toolbar disableGutters>
					<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
						<img
							src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
							alt="Bitcoin Logo"
							style={{ width: '40px', height: '40px' }}
						/>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						CRYPTO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography sx={{ textAlign: "center" }}>{page}</Typography>
								</MenuItem>
							))}
							<MenuItem onClick={handleOpenPricingMenu}>
								<Typography sx={{ textAlign: "center" }}>Pricing</Typography>
							</MenuItem>
							<MenuItem onClick={handleOpenBlogMenu}>
								<Typography sx={{ textAlign: "center" }}>Blog</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
						<img
							src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
							alt="Bitcoin Logo"
							style={{ width: '32px', height: '32px' }}
						/>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						CRYPTO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page}
							</Button>
						))}
						<Button
							onClick={handleOpenPricingMenu}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Pricing
						</Button>
						<Button
							onClick={handleOpenBlogMenu}
							sx={{ my: 2, color: "white", display: "block" }}
						>
							Blog
						</Button>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Arjun Kadam" src={MyAvatar} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography sx={{ textAlign: "center" }}>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Menu
						id="pricing-menu"
						anchorEl={anchorElPricing}
						anchorOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElPricing)}
						onClose={handleClosePricingMenu}
					>
						<MenuItem onClick={handleClosePricingMenu}>
							<Typography>Bitcoin: ${prices.bitcoin?.usd || 'Loading...'}</Typography>
						</MenuItem>
						<MenuItem onClick={handleClosePricingMenu}>
							<Typography>Ethereum: ${prices.ethereum?.usd || 'Loading...'}</Typography>
						</MenuItem>
						<MenuItem onClick={handleClosePricingMenu}>
							<Typography>Cardano: ${prices.cardano?.usd || 'Loading...'}</Typography>
						</MenuItem>
					</Menu>
					<Menu
						id="blog-menu"
						anchorEl={anchorElBlog}
						anchorOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElBlog)}
						onClose={handleCloseBlogMenu}
					>
						<MenuItem onClick={handleCloseBlogMenu}>
							<Typography>Latest Posts</Typography>
						</MenuItem>
						<MenuItem onClick={handleCloseBlogMenu}>
							<Typography>Crypto News</Typography>
						</MenuItem>
						<MenuItem onClick={handleCloseBlogMenu}>
							<Typography>Blockchain Insights</Typography>
						</MenuItem>
					</Menu>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
