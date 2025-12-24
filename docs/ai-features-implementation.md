# AI-Powered Features Implementation - Sri Lanka Tourism

## Overview

This document outlines the implementation of smart AI-powered features for the Sri Lanka Tourism platform, focusing on enhancing user experience through intelligent automation, personalization, and safety features.

## AI Features Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI-POWERED FEATURES ECOSYSTEM                 │
├─────────────────────────────────────────────────────────────────┤
│  ✈️ AI Journey Planner                                         │
│  ├── Multi-leg Trip Planning                                   │
│  ├── Source to Sri Lanka Optimization                         │
│  ├── Transportation Integration                                │
│  └── Real-time Route Adjustment                                │
├─────────────────────────────────────────────────────────────────┤
│  🏨 Stay Recommendation Engine                                 │
│  ├── Preference-based Matching                                 │
│  ├── Budget Optimization                                       │
│  ├── Seasonal Recommendations                                  │
│  └── Location-based Suggestions                                │
├─────────────────────────────────────────────────────────────────┤
│  🔁 Itinerary Optimizer                                        │
│  ├── Weather-based Adjustments                                 │
│  ├── Local Event Integration                                   │
│  ├── Closure Detection                                         │
│  └── Dynamic Re-routing                                        │
├─────────────────────────────────────────────────────────────────┤
│  ⚠️ Scam-Avoidance Alerts                                      │
│  ├── GPS-based Location Analysis                               │
│  ├── Travel Pattern Recognition                                │
│  ├── Suspicious Activity Detection                             │
│  └── Real-time Safety Notifications                            │
├─────────────────────────────────────────────────────────────────┤
│  💬 Conversational AI Assistant                                │
│  ├── Natural Language Processing                               │
│  ├── Local Tips & Recommendations                              │
│  ├── Translation Services                                      │
│  └── Emergency Assistance                                      │
├─────────────────────────────────────────────────────────────────┤
│  📍 Live Tracking & Safety                                     │
│  ├── Real-time Location Tracking                               │
│  ├── Emergency Contact Integration                             │
│  ├── Embassy/Local Support Contact                             │
│  └── Safety Zone Monitoring                                    │
└─────────────────────────────────────────────────────────────────┘
```

## 1. ✈️ AI Journey Planner

### Core Functionality

#### Multi-leg Trip Planning
- **Source Analysis**: Analyze user's departure location and preferences
- **Route Optimization**: Find optimal routes with multiple transportation modes
- **Time Zone Management**: Handle time zone differences and jet lag considerations
- **Budget Allocation**: Intelligent budget distribution across trip components

#### Transportation Integration
- **Flight Integration**: Real-time flight data and booking integration
- **Local Transport**: Seamless integration with local transport options
- **Transfer Management**: Airport transfers and inter-city transportation
- **Route Planning**: Optimized routes considering traffic and weather

### Implementation

```dart
// AI Journey Planner Service
class AIJourneyPlannerService {
  final MLModelService _mlService;
  final TransportationService _transportService;
  final WeatherService _weatherService;
  final EventService _eventService;

  Future<ComprehensiveItinerary> generateJourney({
    required String sourceLocation,
    required JourneyPreferences preferences,
    required DateTime startDate,
    required int duration,
    required double totalBudget,
  }) async {
    // Step 1: Analyze source location and get transportation options
    final transportationOptions = await _transportService.getTransportationOptions(
      from: sourceLocation,
      to: 'Sri Lanka',
      date: startDate,
      budget: totalBudget * 0.4, // Allocate 40% for transportation
    );

    // Step 2: Generate Sri Lanka itinerary
    final sriLankaItinerary = await _generateSriLankaItinerary(
      preferences: preferences,
      startDate: startDate,
      duration: duration,
      remainingBudget: totalBudget * 0.6,
    );

    // Step 3: Optimize the complete journey
    final optimizedJourney = await _optimizeCompleteJourney(
      transportationOptions,
      sriLankaItinerary,
      preferences,
    );

    return ComprehensiveItinerary(
      transportation: optimizedJourney.transportation,
      sriLankaItinerary: optimizedJourney.sriLankaItinerary,
      totalCost: optimizedJourney.totalCost,
      estimatedTime: optimizedJourney.estimatedTime,
      confidence: optimizedJourney.confidence,
    );
  }

  Future<SriLankaItinerary> _generateSriLankaItinerary({
    required JourneyPreferences preferences,
    required DateTime startDate,
    required int duration,
    required double budget,
  }) async {
    // Get destination recommendations based on preferences
    final destinations = await _getDestinationRecommendations(preferences);
    
    // Optimize route between destinations
    final optimizedRoute = await _optimizeDestinationRoute(destinations);
    
    // Allocate time and budget for each destination
    final timeAllocation = await _allocateTime(destinations, duration);
    final budgetAllocation = await _allocateBudget(destinations, budget);
    
    // Generate detailed daily plans
    final dailyPlans = await _generateDailyPlans(
      destinations,
      timeAllocation,
      budgetAllocation,
      preferences,
    );

    return SriLankaItinerary(
      destinations: destinations,
      route: optimizedRoute,
      dailyPlans: dailyPlans,
      totalBudget: budget,
      duration: duration,
    );
  }
}

// Data Models
class ComprehensiveItinerary {
  final TransportationPlan transportation;
  final SriLankaItinerary sriLankaItinerary;
  final double totalCost;
  final Duration estimatedTime;
  final double confidence; // AI confidence score (0-1)

  ComprehensiveItinerary({
    required this.transportation,
    required this.sriLankaItinerary,
    required this.totalCost,
    required this.estimatedTime,
    required this.confidence,
  });
}

class JourneyPreferences {
  final TravelStyle travelStyle;
  final List<Interest> interests;
  final AccommodationType accommodationPreference;
  final FoodPreference foodPreference;
  final ActivityLevel activityLevel;
  final BudgetRange budgetRange;
  final List<String> mustVisit;
  final List<String> avoidAreas;

  JourneyPreferences({
    required this.travelStyle,
    required this.interests,
    required this.accommodationPreference,
    required this.foodPreference,
    required this.activityLevel,
    required this.budgetRange,
    required this.mustVisit,
    required this.avoidAreas,
  });
}
```

### Flutter UI Implementation

```dart
class AIJourneyPlannerPage extends ConsumerStatefulWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AI Journey Planner'),
        actions: [
          IconButton(
            icon: Icon(Icons.help_outline),
            onPressed: () => _showHelpDialog(context),
          ),
        ],
      ),
      body: Column(
        children: [
          _buildPreferencesForm(),
          _buildMapVisualization(),
          _buildRecommendationsList(),
          _buildGenerateButton(),
        ],
      ),
    );
  }

  Widget _buildPreferencesForm() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Journey Preferences', style: Theme.of(context).textTheme.headlineSmall),
            SizedBox(height: 16),
            _buildTravelStyleSelector(),
            _buildInterestsSelector(),
            _buildBudgetSlider(),
            _buildDurationSelector(),
          ],
        ),
      ),
    );
  }

  Widget _buildMapVisualization() {
    return Container(
      height: 300,
      child: GoogleMap(
        initialCameraPosition: CameraPosition(
          target: LatLng(7.8731, 80.7718), // Sri Lanka center
          zoom: 7,
        ),
        markers: _buildDestinationMarkers(),
        polylines: _buildRoutePolylines(),
        onTap: (LatLng position) => _handleMapTap(position),
      ),
    );
  }
}
```

## 2. 🏨 Stay Recommendation Engine

### Core Functionality

#### Preference-based Matching
- **User Profile Analysis**: Analyze user preferences and past behavior
- **Accommodation Matching**: Match accommodations to user preferences
- **Rating Prediction**: Predict user satisfaction with accommodations
- **Personalized Ranking**: Rank recommendations based on user profile

#### Budget Optimization
- **Dynamic Pricing**: Consider seasonal and event-based pricing
- **Value Analysis**: Analyze value for money across different options
- **Budget Allocation**: Optimize budget distribution across accommodation types
- **Deal Detection**: Identify special offers and discounts

### Implementation

```dart
// Stay Recommendation Engine
class StayRecommendationEngine {
  final MLModelService _mlService;
  final AccommodationService _accommodationService;
  final PricingService _pricingService;
  final UserBehaviorService _behaviorService;

  Future<List<AccommodationRecommendation>> getRecommendations({
    required UserProfile userProfile,
    required Location targetLocation,
    required DateTime checkIn,
    required DateTime checkOut,
    required double budget,
    required int guests,
  }) async {
    // Step 1: Get available accommodations
    final availableAccommodations = await _accommodationService.getAvailableAccommodations(
      location: targetLocation,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
    );

    // Step 2: Calculate preference scores
    final preferenceScores = await _calculatePreferenceScores(
      accommodations: availableAccommodations,
      userProfile: userProfile,
    );

    // Step 3: Apply budget filtering
    final budgetFilteredAccommodations = _filterByBudget(
      availableAccommodations,
      budget,
      checkIn,
      checkOut,
    );

    // Step 4: Calculate value scores
    final valueScores = await _calculateValueScores(
      budgetFilteredAccommodations,
      userProfile,
    );

    // Step 5: Generate final recommendations
    final recommendations = await _generateRecommendations(
      budgetFilteredAccommodations,
      preferenceScores,
      valueScores,
      userProfile,
    );

    return recommendations;
  }

  Future<Map<String, double>> _calculatePreferenceScores({
    required List<Accommodation> accommodations,
    required UserProfile userProfile,
  }) async {
    final scores = <String, double>{};
    
    for (final accommodation in accommodations) {
      // Use ML model to predict user preference
      final preferenceScore = await _mlService.predictAccommodationPreference(
        accommodation: accommodation,
        userProfile: userProfile,
      );
      
      scores[accommodation.id] = preferenceScore;
    }
    
    return scores;
  }
}

// Data Models
class AccommodationRecommendation {
  final Accommodation accommodation;
  final double preferenceScore;
  final double valueScore;
  final double overallScore;
  final List<String> reasons;
  final double predictedSatisfaction;
  final PriceBreakdown priceBreakdown;

  AccommodationRecommendation({
    required this.accommodation,
    required this.preferenceScore,
    required this.valueScore,
    required this.overallScore,
    required this.reasons,
    required this.predictedSatisfaction,
    required this.priceBreakdown,
  });
}

class UserProfile {
  final String userId;
  final TravelHistory travelHistory;
  final AccommodationPreferences preferences;
  final BudgetPattern budgetPattern;
  final List<Review> pastReviews;
  final Demographics demographics;

  UserProfile({
    required this.userId,
    required this.travelHistory,
    required this.preferences,
    required this.budgetPattern,
    required this.pastReviews,
    required this.demographics,
  });
}
```

## 3. 🔁 Itinerary Optimizer

### Core Functionality

#### Real-time Optimization
- **Weather Integration**: Adjust plans based on current and forecasted weather
- **Event Detection**: Incorporate local events and festivals
- **Closure Monitoring**: Detect and avoid closed attractions or roads
- **Dynamic Re-routing**: Automatically suggest alternative plans

#### Context-aware Adjustments
- **Time Optimization**: Optimize timing based on traffic and crowd patterns
- **Energy Management**: Consider user fatigue and activity levels
- **Budget Monitoring**: Track spending and suggest cost-saving alternatives
- **Safety Considerations**: Prioritize safety in route and activity planning

### Implementation

```dart
// Itinerary Optimizer Service
class ItineraryOptimizerService {
  final WeatherService _weatherService;
  final EventService _eventService;
  final TrafficService _trafficService;
  final ClosureService _closureService;
  final MLModelService _mlService;

  Future<OptimizedItinerary> optimizeItinerary({
    required Itinerary originalItinerary,
    required DateTime optimizationTime,
    required UserContext userContext,
  }) async {
    // Step 1: Gather real-time data
    final realTimeData = await _gatherRealTimeData(originalItinerary);
    
    // Step 2: Identify optimization opportunities
    final optimizationOpportunities = await _identifyOptimizationOpportunities(
      originalItinerary,
      realTimeData,
    );
    
    // Step 3: Generate optimized alternatives
    final optimizedAlternatives = await _generateOptimizedAlternatives(
      originalItinerary,
      optimizationOpportunities,
      userContext,
    );
    
    // Step 4: Select best optimization
    final bestOptimization = await _selectBestOptimization(
      optimizedAlternatives,
      userContext,
    );
    
    return OptimizedItinerary(
      originalItinerary: originalItinerary,
      optimizedItinerary: bestOptimization,
      changes: bestOptimization.changes,
      reasons: bestOptimization.reasons,
      confidence: bestOptimization.confidence,
    );
  }

  Future<RealTimeData> _gatherRealTimeData(Itinerary itinerary) async {
    final weatherData = await _weatherService.getWeatherForecast(
      locations: itinerary.destinations.map((d) => d.location).toList(),
      dateRange: itinerary.dateRange,
    );
    
    final eventData = await _eventService.getLocalEvents(
      locations: itinerary.destinations.map((d) => d.location).toList(),
      dateRange: itinerary.dateRange,
    );
    
    final closureData = await _closureService.getClosures(
      locations: itinerary.destinations.map((d) => d.location).toList(),
      dateRange: itinerary.dateRange,
    );
    
    final trafficData = await _trafficService.getTrafficConditions(
      routes: itinerary.routes,
      dateRange: itinerary.dateRange,
    );
    
    return RealTimeData(
      weather: weatherData,
      events: eventData,
      closures: closureData,
      traffic: trafficData,
    );
  }
}

// Data Models
class OptimizedItinerary {
  final Itinerary originalItinerary;
  final Itinerary optimizedItinerary;
  final List<ItineraryChange> changes;
  final List<String> reasons;
  final double confidence;
  final OptimizationMetrics metrics;

  OptimizedItinerary({
    required this.originalItinerary,
    required this.optimizedItinerary,
    required this.changes,
    required this.reasons,
    required this.confidence,
    required this.metrics,
  });
}

class ItineraryChange {
  final ChangeType type;
  final String description;
  final String reason;
  final double impact; // Positive or negative impact score
  final List<String> affectedActivities;

  ItineraryChange({
    required this.type,
    required this.description,
    required this.reason,
    required this.impact,
    required this.affectedActivities,
  });
}
```

## 4. ⚠️ Scam-Avoidance Alerts

### Core Functionality

#### Location-based Analysis
- **GPS Monitoring**: Monitor user location in real-time
- **Scam Zone Detection**: Identify known scam-prone areas
- **Suspicious Activity Detection**: Detect unusual pricing or behavior patterns
- **Safety Zone Mapping**: Map safe and unsafe areas

#### Pattern Recognition
- **Travel Pattern Analysis**: Analyze user movement patterns
- **Anomaly Detection**: Detect unusual behavior or pricing
- **Historical Data**: Use historical scam data for predictions
- **Real-time Alerts**: Provide immediate safety notifications

### Implementation

```dart
// Scam Avoidance Service
class ScamAvoidanceService {
  final LocationService _locationService;
  final ScamDatabaseService _scamDatabase;
  final MLModelService _mlService;
  final NotificationService _notificationService;

  Stream<SafetyAlert> monitorUserSafety({
    required String userId,
    required Location userLocation,
  }) {
    return _locationService.getLocationStream(userId).asyncMap((location) async {
      final safetyAnalysis = await _analyzeLocationSafety(location);
      
      if (safetyAnalysis.riskLevel > RiskLevel.medium) {
        final alert = SafetyAlert(
          type: AlertType.scamWarning,
          severity: safetyAnalysis.riskLevel,
          location: location,
          message: safetyAnalysis.warningMessage,
          recommendations: safetyAnalysis.recommendations,
          timestamp: DateTime.now(),
        );
        
        await _notificationService.sendAlert(userId, alert);
        return alert;
      }
      
      return SafetyAlert.empty();
    }).where((alert) => alert.isNotEmpty);
  }

  Future<SafetyAnalysis> _analyzeLocationSafety(Location location) async {
    // Check against known scam areas
    final nearbyScamAreas = await _scamDatabase.getNearbyScamAreas(
      location: location,
      radius: 1000, // 1km radius
    );
    
    // Check for suspicious pricing patterns
    final suspiciousPricing = await _detectSuspiciousPricing(location);
    
    // Check for unusual activity patterns
    final unusualActivity = await _detectUnusualActivity(location);
    
    // Calculate overall risk level
    final riskLevel = _calculateRiskLevel(
      nearbyScamAreas,
      suspiciousPricing,
      unusualActivity,
    );
    
    return SafetyAnalysis(
      location: location,
      riskLevel: riskLevel,
      scamAreas: nearbyScamAreas,
      suspiciousPricing: suspiciousPricing,
      unusualActivity: unusualActivity,
      warningMessage: _generateWarningMessage(riskLevel),
      recommendations: _generateRecommendations(riskLevel),
    );
  }
}

// Data Models
class SafetyAlert {
  final AlertType type;
  final RiskLevel severity;
  final Location location;
  final String message;
  final List<String> recommendations;
  final DateTime timestamp;

  SafetyAlert({
    required this.type,
    required this.severity,
    required this.location,
    required this.message,
    required this.recommendations,
    required this.timestamp,
  });

  static SafetyAlert empty() => SafetyAlert(
    type: AlertType.none,
    severity: RiskLevel.none,
    location: Location.empty(),
    message: '',
    recommendations: [],
    timestamp: DateTime.now(),
  );

  bool get isEmpty => type == AlertType.none;
}

enum RiskLevel { none, low, medium, high, critical }
enum AlertType { none, scamWarning, safetyAlert, pricingAlert, locationAlert }
```

## 5. 💬 Conversational AI Assistant

### Core Functionality

#### Natural Language Processing
- **Intent Recognition**: Understand user queries and intents
- **Entity Extraction**: Extract relevant information from queries
- **Context Management**: Maintain conversation context
- **Multi-language Support**: Support Sinhala, Tamil, and English

#### Specialized Assistance
- **Local Tips**: Provide local knowledge and recommendations
- **Translation Services**: Real-time translation assistance
- **Emergency Aid**: Provide emergency information and contacts
- **Cultural Guidance**: Offer cultural etiquette and guidance

### Implementation

```dart
// Conversational AI Assistant Service
class ConversationalAIService {
  final NLPService _nlpService;
  final TranslationService _translationService;
  final LocalKnowledgeService _localKnowledgeService;
  final EmergencyService _emergencyService;
  final ContextManager _contextManager;

  Future<AIResponse> processQuery({
    required String query,
    required UserContext userContext,
    required Location userLocation,
  }) async {
    // Step 1: Process natural language
    final nlpResult = await _nlpService.processQuery(query);
    
    // Step 2: Manage conversation context
    final context = await _contextManager.updateContext(
      query: query,
      nlpResult: nlpResult,
      userContext: userContext,
    );
    
    // Step 3: Generate response based on intent
    final response = await _generateResponse(
      nlpResult: nlpResult,
      context: context,
      userLocation: userLocation,
    );
    
    // Step 4: Update context with response
    await _contextManager.addResponse(response);
    
    return response;
  }

  Future<AIResponse> _generateResponse({
    required NLPResult nlpResult,
    required ConversationContext context,
    required Location userLocation,
  }) async {
    switch (nlpResult.intent) {
      case Intent.translation:
        return await _handleTranslation(nlpResult, context);
      case Intent.localTip:
        return await _handleLocalTip(nlpResult, userLocation);
      case Intent.emergency:
        return await _handleEmergency(nlpResult, userLocation);
      case Intent.general:
        return await _handleGeneralQuery(nlpResult, context);
      case Intent.booking:
        return await _handleBookingQuery(nlpResult, context);
      case Intent.navigation:
        return await _handleNavigationQuery(nlpResult, userLocation);
      default:
        return await _handleUnknownIntent(nlpResult);
    }
  }
}

// Data Models
class AIResponse {
  final String message;
  final ResponseType type;
  final List<QuickAction> quickActions;
  final List<Attachment> attachments;
  final bool requiresFollowUp;
  final Map<String, dynamic> metadata;

  AIResponse({
    required this.message,
    required this.type,
    required this.quickActions,
    required this.attachments,
    required this.requiresFollowUp,
    required this.metadata,
  });
}

class ConversationContext {
  final String sessionId;
  final List<Message> messageHistory;
  final UserContext userContext;
  final Map<String, dynamic> extractedEntities;
  final DateTime lastActivity;

  ConversationContext({
    required this.sessionId,
    required this.messageHistory,
    required this.userContext,
    required this.extractedEntities,
    required this.lastActivity,
  });
}
```

## 6. 📍 Live Tracking & Safety

### Core Functionality

#### Real-time Location Tracking
- **GPS Monitoring**: Continuous location tracking with privacy controls
- **Emergency Contacts**: Automatic notification to emergency contacts
- **Embassy Integration**: Direct contact with embassy and local support
- **Safety Zone Monitoring**: Monitor entry/exit from safe zones

#### Safety Features
- **Panic Button**: One-tap emergency assistance
- **Safety Check-ins**: Regular safety check-in reminders
- **Route Sharing**: Share travel route with trusted contacts
- **Emergency Services**: Direct contact with local emergency services

### Implementation

```dart
// Live Tracking Service
class LiveTrackingService {
  final LocationService _locationService;
  final EmergencyContactService _emergencyContactService;
  final EmbassyService _embassyService;
  final NotificationService _notificationService;

  Stream<TrackingUpdate> trackUser({
    required String userId,
    required List<EmergencyContact> emergencyContacts,
    required SafetySettings safetySettings,
  }) {
    return _locationService.getLocationStream(userId).map((location) {
      return TrackingUpdate(
        userId: userId,
        location: location,
        timestamp: DateTime.now(),
        safetyStatus: _assessSafetyStatus(location, safetySettings),
      );
    }).asyncMap((update) async {
      // Check safety status and send alerts if needed
      if (update.safetyStatus.isUnsafe) {
        await _handleUnsafeLocation(update, emergencyContacts);
      }
      
      return update;
    });
  }

  Future<void> _handleUnsafeLocation(
    TrackingUpdate update,
    List<EmergencyContact> emergencyContacts,
  ) async {
    // Send alerts to emergency contacts
    for (final contact in emergencyContacts) {
      await _notificationService.sendEmergencyAlert(
        contact: contact,
        update: update,
      );
    }
    
    // Notify embassy if user is a foreign tourist
    if (update.userId.contains('tourist')) {
      await _embassyService.notifyEmbassy(update);
    }
  }

  Future<void> initiatePanicButton({
    required String userId,
    required Location location,
  }) async {
    final panicAlert = PanicAlert(
      userId: userId,
      location: location,
      timestamp: DateTime.now(),
      type: PanicType.emergency,
    );
    
    // Send to emergency contacts
    await _emergencyContactService.sendPanicAlert(panicAlert);
    
    // Send to local emergency services
    await _emergencyContactService.contactEmergencyServices(panicAlert);
    
    // Send to embassy
    await _embassyService.reportEmergency(panicAlert);
  }
}

// Data Models
class TrackingUpdate {
  final String userId;
  final Location location;
  final DateTime timestamp;
  final SafetyStatus safetyStatus;

  TrackingUpdate({
    required this.userId,
    required this.location,
    required this.timestamp,
    required this.safetyStatus,
  });
}

class SafetyStatus {
  final SafetyLevel level;
  final List<String> warnings;
  final List<String> recommendations;
  final bool isUnsafe;

  SafetyStatus({
    required this.level,
    required this.warnings,
    required this.recommendations,
    required this.isUnsafe,
  });
}
```

## Flutter UI Implementation

### AI Features Dashboard

```dart
class AIFeaturesDashboard extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: Text('AI Assistant')),
      body: Column(
        children: [
          _buildQuickActions(),
          _buildConversationalAI(),
          _buildSafetyStatus(),
          _buildRecommendations(),
        ],
      ),
    );
  }

  Widget _buildConversationalAI() {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Ask me anything about Sri Lanka', 
                 style: Theme.of(context).textTheme.headlineSmall),
            SizedBox(height: 16),
            TextField(
              decoration: InputDecoration(
                hintText: 'How do I get to Sigiriya?',
                suffixIcon: IconButton(
                  icon: Icon(Icons.send),
                  onPressed: () => _sendQuery(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Safety Alerts Widget

```dart
class SafetyAlertsWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final safetyAlerts = ref.watch(safetyAlertsProvider);
    
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: Icon(Icons.warning, color: Colors.orange),
            title: Text('Safety Alerts'),
            trailing: Icon(Icons.arrow_forward_ios),
          ),
          if (safetyAlerts.isNotEmpty)
            ...safetyAlerts.map((alert) => _buildAlertTile(alert)),
        ],
      ),
    );
  }

  Widget _buildAlertTile(SafetyAlert alert) {
    return ListTile(
      leading: Icon(_getAlertIcon(alert.severity), 
                   color: _getAlertColor(alert.severity)),
      title: Text(alert.message),
      subtitle: Text(alert.location.address),
      onTap: () => _showAlertDetails(alert),
    );
  }
}
```

This comprehensive AI features implementation provides intelligent, context-aware assistance to enhance the tourism experience while ensuring user safety and satisfaction.
