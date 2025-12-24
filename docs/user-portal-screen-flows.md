# User Portal Screen Flows - Sri Lanka Tourism Flutter App

## Overview

This document outlines the comprehensive screen flow sequences for the user portal, providing a seamless and intuitive user experience from initial registration through post-travel activities.

## Screen Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER PORTAL SCREEN FLOWS                      │
├─────────────────────────────────────────────────────────────────┤
│  📱 Home & Registration Flow                                   │
│  ├── Welcome Screen                                            │
│  ├── Registration Screen                                       │
│  ├── Preferences Screen                                        │
│  └── Dashboard Screen                                          │
├─────────────────────────────────────────────────────────────────┤
│  🧠 AI Planner Flow                                           │
│  ├── Smart Form Screen                                         │
│  ├── Map Selection Screen                                      │
│  ├── Recommendations Screen                                    │
│  └── Itinerary Generation Screen                               │
├─────────────────────────────────────────────────────────────────┤
│  🏨 Hotel & Homestay Booking Flow                             │
│  ├── Search & Filter Screen                                    │
│  ├── Property Details Screen                                   │
│  ├── Booking Form Screen                                       │
│  └── Confirmation Screen                                       │
├─────────────────────────────────────────────────────────────────┤
│  📋 Visa & Immigration Flow                                   │
│  ├── Requirements Screen                                       │
│  ├── Document Upload Screen                                    │
│  ├── Application Form Screen                                   │
│  └── Status Tracking Screen                                    │
├─────────────────────────────────────────────────────────────────┤
│  🏥 Medical Tourism Flow                                       │
│  ├── Medical Search Screen                                     │
│  ├── Doctor Selection Screen                                   │
│  ├── Consultation Booking Screen                               │
│  └── Treatment Planning Screen                                 │
├─────────────────────────────────────────────────────────────────┤
│  📊 Post-Travel Dashboard Flow                                 │
│  ├── Experience Review Screen                                  │
│  ├── Photo Upload Screen                                       │
│  ├── Feedback Screen                                           │
│  └── Future Planning Screen                                    │
└─────────────────────────────────────────────────────────────────┘
```

## 1. 📱 Home & Registration Flow

### Flow Sequence
```
Welcome Screen → Registration Screen → Preferences Screen → Verification Screen → Dashboard Screen
```

### Screen Implementations

#### Welcome Screen
```dart
class WelcomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/sri_lanka_welcome.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Spacer(),
              _buildWelcomeContent(),
              _buildActionButtons(context),
              SizedBox(height: 50),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWelcomeContent() {
    return Container(
      padding: EdgeInsets.all(24),
      child: Column(
        children: [
          Text(
            'Welcome to Sri Lanka',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          SizedBox(height: 16),
          Text(
            'Discover the Pearl of the Indian Ocean',
            style: TextStyle(
              fontSize: 18,
              color: Colors.white70,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 24),
          _buildFeaturesList(),
        ],
      ),
    );
  }

  Widget _buildFeaturesList() {
    final features = [
      'AI-Powered Trip Planning',
      'Government-Verified Services',
      'Real-time Safety Alerts',
      'Local Expert Recommendations',
    ];

    return Column(
      children: features.map((feature) => 
        Padding(
          padding: EdgeInsets.symmetric(vertical: 4),
          child: Row(
            children: [
              Icon(Icons.check_circle, color: Colors.green, size: 20),
              SizedBox(width: 12),
              Text(
                feature,
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ],
          ),
        ),
      ).toList(),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/registration'),
              child: Text('Get Started', style: TextStyle(fontSize: 18)),
            ),
          ),
          SizedBox(height: 12),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, '/login'),
            child: Text(
              'Already have an account? Sign In',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
```

#### Registration Screen
```dart
class RegistrationScreen extends StatefulWidget {
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Account'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildHeader(),
              SizedBox(height: 32),
              _buildFormFields(),
              SizedBox(height: 24),
              _buildTermsAndConditions(),
              SizedBox(height: 24),
              _buildRegisterButton(),
              SizedBox(height: 16),
              _buildSocialLoginOptions(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Text(
          'Join Sri Lanka Tourism',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Create your account to start planning your journey',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildFormFields() {
    return Column(
      children: [
        _buildTextField(
          controller: _nameController,
          label: 'Full Name',
          icon: Icons.person,
          validator: (value) => value?.isEmpty == true ? 'Name is required' : null,
        ),
        SizedBox(height: 16),
        _buildTextField(
          controller: _emailController,
          label: 'Email Address',
          icon: Icons.email,
          keyboardType: TextInputType.emailAddress,
          validator: (value) => _validateEmail(value),
        ),
        SizedBox(height: 16),
        _buildTextField(
          controller: _phoneController,
          label: 'Phone Number',
          icon: Icons.phone,
          keyboardType: TextInputType.phone,
          validator: (value) => _validatePhone(value),
        ),
        SizedBox(height: 16),
        _buildTextField(
          controller: _passwordController,
          label: 'Password',
          icon: Icons.lock,
          obscureText: true,
          validator: (value) => _validatePassword(value),
        ),
      ],
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType? keyboardType,
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      validator: validator,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        filled: true,
        fillColor: Colors.grey[50],
      ),
    );
  }
}
```

#### Preferences Screen
```dart
class PreferencesScreen extends StatefulWidget {
  @override
  _PreferencesScreenState createState() => _PreferencesScreenState();
}

class _PreferencesScreenState extends State<PreferencesScreen> {
  TravelStyle _selectedTravelStyle = TravelStyle.cultural;
  List<Interest> _selectedInterests = [];
  AccommodationType _accommodationType = AccommodationType.hotel;
  BudgetRange _budgetRange = BudgetRange.moderate;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Travel Preferences'),
        actions: [
          TextButton(
            onPressed: _skipPreferences,
            child: Text('Skip'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            SizedBox(height: 32),
            _buildTravelStyleSection(),
            SizedBox(height: 24),
            _buildInterestsSection(),
            SizedBox(height: 24),
            _buildAccommodationSection(),
            SizedBox(height: 24),
            _buildBudgetSection(),
            SizedBox(height: 32),
            _buildContinueButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Tell us about your preferences',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'This helps us personalize your Sri Lankan experience',
          style: TextStyle(
            fontSize: 16,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }

  Widget _buildTravelStyleSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Travel Style',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: TravelStyle.values.map((style) => 
            _buildChoiceChip(
              label: style.displayName,
              isSelected: _selectedTravelStyle == style,
              onSelected: (selected) {
                setState(() {
                  _selectedTravelStyle = style;
                });
              },
            ),
          ).toList(),
        ),
      ],
    );
  }

  Widget _buildInterestsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Interests',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: Interest.values.map((interest) => 
            _buildChoiceChip(
              label: interest.displayName,
              isSelected: _selectedInterests.contains(interest),
              onSelected: (selected) {
                setState(() {
                  if (selected) {
                    _selectedInterests.add(interest);
                  } else {
                    _selectedInterests.remove(interest);
                  }
                });
              },
            ),
          ).toList(),
        ),
      ],
    );
  }

  Widget _buildChoiceChip({
    required String label,
    required bool isSelected,
    required Function(bool) onSelected,
  }) {
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: onSelected,
      selectedColor: Theme.of(context).primaryColor.withOpacity(0.2),
      labelStyle: TextStyle(
        color: isSelected ? Theme.of(context).primaryColor : Colors.grey[700],
        fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
      ),
    );
  }
}
```

## 2. 🧠 AI Planner Flow

### Flow Sequence
```
Smart Form Screen → Map Selection Screen → Recommendations Screen → Itinerary Generation Screen
```

#### Smart Form Screen
```dart
class SmartFormScreen extends StatefulWidget {
  @override
  _SmartFormScreenState createState() => _SmartFormScreenState();
}

class _SmartFormScreenState extends State<SmartFormScreen> {
  final _formKey = GlobalKey<FormState>();
  DateTime _startDate = DateTime.now().add(Duration(days: 30));
  int _duration = 7;
  int _travelers = 2;
  double _budget = 2000;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Plan Your Journey'),
        actions: [
          IconButton(
            icon: Icon(Icons.help_outline),
            onPressed: _showHelp,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              SizedBox(height: 32),
              _buildDateSelector(),
              SizedBox(height: 24),
              _buildDurationSelector(),
              SizedBox(height: 24),
              _buildTravelersSelector(),
              SizedBox(height: 24),
              _buildBudgetSelector(),
              SizedBox(height: 32),
              _buildGenerateButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDateSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'When do you want to travel?',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        InkWell(
          onTap: _selectStartDate,
          child: Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey[300]!),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Icon(Icons.calendar_today, color: Colors.grey[600]),
                SizedBox(width: 12),
                Text(
                  DateFormat('MMM dd, yyyy').format(_startDate),
                  style: TextStyle(fontSize: 16),
                ),
                Spacer(),
                Icon(Icons.arrow_drop_down, color: Colors.grey[600]),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDurationSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'How long will you stay?',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: Slider(
                value: _duration.toDouble(),
                min: 3,
                max: 30,
                divisions: 27,
                label: '$_duration days',
                onChanged: (value) {
                  setState(() {
                    _duration = value.round();
                  });
                },
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                '$_duration days',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBudgetSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Budget Range',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: Slider(
                value: _budget,
                min: 500,
                max: 10000,
                divisions: 95,
                label: '\$${_budget.toStringAsFixed(0)}',
                onChanged: (value) {
                  setState(() {
                    _budget = value;
                  });
                },
              ),
            ),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: Colors.green,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                '\$${_budget.toStringAsFixed(0)}',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
        Text(
          'This includes accommodation, transport, and activities',
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }
}
```

#### Map Selection Screen
```dart
class MapSelectionScreen extends StatefulWidget {
  @override
  _MapSelectionScreenState createState() => _MapSelectionScreenState();
}

class _MapSelectionScreenState extends State<MapSelectionScreen> {
  GoogleMapController? _mapController;
  Set<Marker> _markers = {};
  List<Destination> _selectedDestinations = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Destinations'),
        actions: [
          IconButton(
            icon: Icon(Icons.list),
            onPressed: _showDestinationsList,
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(7.8731, 80.7718), // Sri Lanka center
                zoom: 7,
              ),
              onMapCreated: (GoogleMapController controller) {
                _mapController = controller;
                _loadDestinations();
              },
              markers: _markers,
              onTap: (LatLng position) => _handleMapTap(position),
            ),
          ),
          _buildSelectedDestinations(),
          _buildActionButtons(),
        ],
      ),
    );
  }

  Widget _buildSelectedDestinations() {
    if (_selectedDestinations.isEmpty) {
      return SizedBox.shrink();
    }

    return Container(
      height: 120,
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Selected Destinations (${_selectedDestinations.length})',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _selectedDestinations.length,
              itemBuilder: (context, index) {
                final destination = _selectedDestinations[index];
                return Container(
                  width: 200,
                  margin: EdgeInsets.only(right: 12),
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(12),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            destination.name,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                          SizedBox(height: 4),
                          Text(
                            destination.category,
                            style: TextStyle(
                              color: Colors.grey[600],
                              fontSize: 12,
                            ),
                          ),
                          Spacer(),
                          Row(
                            children: [
                              Icon(Icons.star, size: 16, color: Colors.amber),
                              SizedBox(width: 4),
                              Text(
                                destination.rating.toString(),
                                style: TextStyle(fontSize: 12),
                              ),
                              Spacer(),
                              IconButton(
                                icon: Icon(Icons.close, size: 16),
                                onPressed: () => _removeDestination(destination),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
```

## 3. 🏨 Hotel & Homestay Booking Flow

### Flow Sequence
```
Search & Filter Screen → Property Details Screen → Booking Form Screen → Confirmation Screen
```

#### Search & Filter Screen
```dart
class SearchFilterScreen extends StatefulWidget {
  @override
  _SearchFilterScreenState createState() => _SearchFilterScreenState();
}

class _SearchFilterScreenState extends State<SearchFilterScreen> {
  String _searchQuery = '';
  String _selectedLocation = '';
  AccommodationType _accommodationType = AccommodationType.all;
  PriceRange _priceRange = PriceRange.all;
  List<Accommodation> _accommodations = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Find Accommodation'),
        actions: [
          IconButton(
            icon: Icon(Icons.filter_list),
            onPressed: _showFilters,
          ),
        ],
      ),
      body: Column(
        children: [
          _buildSearchBar(),
          _buildQuickFilters(),
          Expanded(
            child: _buildAccommodationsList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return Container(
      padding: EdgeInsets.all(16),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Search destinations, hotels, or areas',
          prefixIcon: Icon(Icons.search),
          suffixIcon: IconButton(
            icon: Icon(Icons.mic),
            onPressed: _startVoiceSearch,
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          filled: true,
          fillColor: Colors.grey[50],
        ),
        onChanged: (value) {
          setState(() {
            _searchQuery = value;
          });
          _performSearch();
        },
      ),
    );
  }

  Widget _buildQuickFilters() {
    return Container(
      height: 50,
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _buildFilterChip('Hotels', AccommodationType.hotel),
          _buildFilterChip('Homestays', AccommodationType.homestay),
          _buildFilterChip('Villas', AccommodationType.villa),
          _buildFilterChip('Budget', PriceRange.budget),
          _buildFilterChip('Luxury', PriceRange.luxury),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, dynamic value) {
    bool isSelected = false;
    if (value is AccommodationType) {
      isSelected = _accommodationType == value;
    } else if (value is PriceRange) {
      isSelected = _priceRange == value;
    }

    return Container(
      margin: EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        onSelected: (selected) {
          setState(() {
            if (value is AccommodationType) {
              _accommodationType = selected ? value : AccommodationType.all;
            } else if (value is PriceRange) {
              _priceRange = selected ? value : PriceRange.all;
            }
          });
          _applyFilters();
        },
      ),
    );
  }
}
```

#### Property Details Screen
```dart
class PropertyDetailsScreen extends StatefulWidget {
  final Accommodation accommodation;

  @override
  _PropertyDetailsScreenState createState() => _PropertyDetailsScreenState();
}

class _PropertyDetailsScreenState extends State<PropertyDetailsScreen> {
  int _currentImageIndex = 0;
  bool _isFavorited = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          _buildAppBar(),
          _buildImageGallery(),
          _buildPropertyInfo(),
          _buildAmenities(),
          _buildReviews(),
          _buildLocation(),
        ],
      ),
      bottomNavigationBar: _buildBottomBar(),
    );
  }

  Widget _buildImageGallery() {
    return SliverToBoxAdapter(
      child: Container(
        height: 300,
        child: Stack(
          children: [
            PageView.builder(
              onPageChanged: (index) {
                setState(() {
                  _currentImageIndex = index;
                });
              },
              itemCount: widget.accommodation.images.length,
              itemBuilder: (context, index) {
                return Image.network(
                  widget.accommodation.images[index],
                  fit: BoxFit.cover,
                );
              },
            ),
            Positioned(
              bottom: 16,
              left: 0,
              right: 0,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: widget.accommodation.images.asMap().entries.map((entry) {
                  return Container(
                    width: 8,
                    height: 8,
                    margin: EdgeInsets.symmetric(horizontal: 4),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _currentImageIndex == entry.key
                          ? Colors.white
                          : Colors.white.withOpacity(0.4),
                    ),
                  );
                }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPropertyInfo() {
    return SliverToBoxAdapter(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    widget.accommodation.name,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(
                    _isFavorited ? Icons.favorite : Icons.favorite_border,
                    color: _isFavorited ? Colors.red : Colors.grey,
                  ),
                  onPressed: () {
                    setState(() {
                      _isFavorited = !_isFavorited;
                    });
                  },
                ),
              ],
            ),
            SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.location_on, size: 16, color: Colors.grey),
                SizedBox(width: 4),
                Text(
                  widget.accommodation.location,
                  style: TextStyle(color: Colors.grey[600]),
                ),
                Spacer(),
                Row(
                  children: [
                    Icon(Icons.star, size: 16, color: Colors.amber),
                    SizedBox(width: 4),
                    Text(
                      widget.accommodation.rating.toString(),
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    Text(
                      ' (${widget.accommodation.reviewCount} reviews)',
                      style: TextStyle(color: Colors.grey[600]),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: 16),
            Text(
              widget.accommodation.description,
              style: TextStyle(
                fontSize: 16,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

## 4. 📋 Visa & Immigration Flow

### Flow Sequence
```
Requirements Screen → Document Upload Screen → Application Form Screen → Status Tracking Screen
```

#### Requirements Screen
```dart
class VisaRequirementsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Visa Requirements'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            SizedBox(height: 24),
            _buildVisaTypes(),
            SizedBox(height: 24),
            _buildRequirementsList(),
            SizedBox(height: 24),
            _buildProcessSteps(),
            SizedBox(height: 24),
            _buildApplyButton(context),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(Icons.assignment, size: 48, color: Theme.of(context).primaryColor),
            SizedBox(height: 16),
            Text(
              'Sri Lanka Visa Information',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Get your visa approved quickly with our guided process',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVisaTypes() {
    final visaTypes = [
      VisaType(
        name: 'Tourist Visa',
        duration: '30 days',
        price: '\$35',
        description: 'For leisure and tourism purposes',
        processingTime: '24-48 hours',
      ),
      VisaType(
        name: 'Business Visa',
        duration: '90 days',
        price: '\$50',
        description: 'For business and commercial activities',
        processingTime: '3-5 days',
      ),
      VisaType(
        name: 'Transit Visa',
        duration: '7 days',
        price: '\$20',
        description: 'For travelers transiting through Sri Lanka',
        processingTime: '24 hours',
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Available Visa Types',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 16),
        ...visaTypes.map((visaType) => _buildVisaTypeCard(visaType)),
      ],
    );
  }

  Widget _buildVisaTypeCard(VisaType visaType) {
    return Card(
      margin: EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    visaType.name,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.green,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    visaType.price,
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              visaType.description,
              style: TextStyle(color: Colors.grey[600]),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                _buildInfoChip(
                  icon: Icons.schedule,
                  label: visaType.duration,
                ),
                SizedBox(width: 12),
                _buildInfoChip(
                  icon: Icons.timer,
                  label: visaType.processingTime,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoChip({required IconData icon, required String label}) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: Colors.grey[600]),
          SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }
}
```

## 5. 🏥 Medical Tourism Flow

### Flow Sequence
```
Medical Search Screen → Doctor Selection Screen → Consultation Booking Screen → Treatment Planning Screen
```

#### Medical Search Screen
```dart
class MedicalSearchScreen extends StatefulWidget {
  @override
  _MedicalSearchScreenState createState() => _MedicalSearchScreenState();
}

class _MedicalSearchScreenState extends State<MedicalSearchScreen> {
  String _searchQuery = '';
  MedicalSpecialty _selectedSpecialty = MedicalSpecialty.all;
  List<MedicalFacility> _facilities = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Medical Tourism'),
        actions: [
          IconButton(
            icon: Icon(Icons.filter_list),
            onPressed: _showFilters,
          ),
        ],
      ),
      body: Column(
        children: [
          _buildSearchSection(),
          _buildSpecialtiesFilter(),
          Expanded(
            child: _buildFacilitiesList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchSection() {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue[50],
        border: Border(
          bottom: BorderSide(color: Colors.blue[100]!),
        ),
      ),
      child: Column(
        children: [
          Text(
            'Find the Best Medical Care in Sri Lanka',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.blue[800],
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 16),
          TextField(
            decoration: InputDecoration(
              hintText: 'Search treatments, doctors, or hospitals',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              filled: true,
              fillColor: Colors.white,
            ),
            onChanged: (value) {
              setState(() {
                _searchQuery = value;
              });
              _performSearch();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSpecialtiesFilter() {
    return Container(
      height: 50,
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: MedicalSpecialty.values.map((specialty) => 
          Container(
            margin: EdgeInsets.only(right: 8),
            child: FilterChip(
              label: Text(specialty.displayName),
              selected: _selectedSpecialty == specialty,
              onSelected: (selected) {
                setState(() {
                  _selectedSpecialty = selected ? specialty : MedicalSpecialty.all;
                });
                _applyFilters();
              },
            ),
          ),
        ).toList(),
      ),
    );
  }
}
```

## 6. 📊 Post-Travel Dashboard Flow

### Flow Sequence
```
Experience Review Screen → Photo Upload Screen → Feedback Screen → Future Planning Screen
```

#### Experience Review Screen
```dart
class ExperienceReviewScreen extends StatefulWidget {
  @override
  _ExperienceReviewScreenState createState() => _ExperienceReviewScreenState();
}

class _ExperienceReviewScreenState extends State<ExperienceReviewScreen> {
  List<Booking> _completedBookings = [];
  int _currentBookingIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Review Your Experience'),
      ),
      body: _completedBookings.isEmpty
          ? _buildEmptyState()
          : _buildReviewForm(),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.travel_explore,
            size: 80,
            color: Colors.grey[400],
          ),
          SizedBox(height: 16),
          Text(
            'No completed trips yet',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 8),
          Text(
            'Complete a trip to leave reviews and share your experience',
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[500],
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildReviewForm() {
    final booking = _completedBookings[_currentBookingIndex];
    
    return SingleChildScrollView(
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildProgressIndicator(),
          SizedBox(height: 24),
          _buildBookingCard(booking),
          SizedBox(height: 24),
          _buildRatingSection(),
          SizedBox(height: 24),
          _buildReviewTextSection(),
          SizedBox(height: 24),
          _buildPhotoUploadSection(),
          SizedBox(height: 32),
          _buildActionButtons(),
        ],
      ),
    );
  }

  Widget _buildProgressIndicator() {
    return Column(
      children: [
        LinearProgressIndicator(
          value: (_currentBookingIndex + 1) / _completedBookings.length,
          backgroundColor: Colors.grey[200],
          valueColor: AlwaysStoppedAnimation<Color>(Theme.of(context).primaryColor),
        ),
        SizedBox(height: 8),
        Text(
          'Review ${_currentBookingIndex + 1} of ${_completedBookings.length}',
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }
}
```

This comprehensive screen flow implementation provides a seamless user experience from initial registration through post-travel activities, with intuitive navigation and user-friendly interfaces for each step of the journey.
