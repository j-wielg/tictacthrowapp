# Changelog


## [0.3.1] - 2024-11-03

### Added

N/A

### Changed

 - Login/register now render error messages instead of printing to console
 - User is navigated to '/' upon successful register/login

### Fixed

 - Fixed a bug that prevented register/login requests from reaching the database
 - Removed an unused import (useEffect) from register/login

## [0.3.0] - 2024-11-01

### Added

 - Settings page (currently empty)
 - Protected routes (require user login)
 - Register and login pages connected to Parse API

### Changed

N/A

### Fixed

N/A

## [0.2.0] - 2024-10-18

### Added

 - Imported the 'react-router-dom' package as a dependency
 - Implemented routing
 - Added service which fetches the default game from the server

### Changed

 - Moved files to follow React style guidelines

### Fixed


## [0.1.0]

### Added

Initial version of the project. Implemented a single webpage with an ASCII-art representation of the game

