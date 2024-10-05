import pandas as pd
import os

# Load the dataset from CSV
file_path = "gun.csv"
df = pd.read_csv(file_path)

# 1. Cleaning the dataset (Handling missing values)

# Fill NaN values in numeric columns with -1
df.loc[:, df.select_dtypes(include=['number']).columns] = df.select_dtypes(include=['number']).fillna(-1)

# Fill NaN values in string/object columns with an empty string
df.loc[:, df.select_dtypes(include='object').columns] = df.select_dtypes(include='object').fillna('')

# 2. Calculate derived fields

# Add total victims (sum of n_killed and n_injured)
df['total_victims'] = df['n_killed'] + df['n_injured']

# Add fatality ratio (ratio of fatalities to total victims)
df['fatality_ratio'] = df['n_killed'] / df['total_victims'].replace(0, 1)

# Add incident severity based on number of victims
def categorize_severity(row):
    if row['n_killed'] >= 4:
        return "High Fatality"
    elif row['n_injured'] >= 4:
        return "High Injury"
    elif row['total_victims'] >= 4:
        return "Mass Shooting"
    else:
        return "Low Severity"

df['incident_severity'] = df.apply(categorize_severity, axis=1)

# 3. Extract date-related fields

# Convert 'date' field to datetime
df['date'] = pd.to_datetime(df['date'], errors='coerce')

# Extract year, month, and day_of_week from date
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.day_name()

# Check if the incident occurred on a weekend
df['weekend'] = df['day_of_week'].isin(['Saturday', 'Sunday'])

# 4. Create an explicit index column
df.reset_index(drop=False, inplace=True)  # Create an 'index' column

# 5. Select only the specified attributes
selected_columns = [
    'index', 'date', 'state', 'city_or_county', 
    'n_killed', 'n_injured', 'total_victims', 
    'fatality_ratio', 'year', 'month', 'day_of_week', 'weekend'
]

# Keep only the selected columns
df_filtered = df[selected_columns]

# 6. Display the processed data
print(df_filtered.head())  # Show the first few rows to confirm processing

# 7. Saving the processed dataset to a new CSV file
output_file = "parsed_gun.csv"

try:
    # Attempt to save the filtered DataFrame
    df_filtered.to_csv(output_file, index=False)
    print(f"Processed data saved to {output_file}")
except Exception as e:
    print(f"Error saving file: {e}")